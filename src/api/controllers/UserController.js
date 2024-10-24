/* eslint-disable prefer-arrow-callback */
// api/controllers/UserController.js

const cloudinary = require('../../config/cloudinary');

async function configureUserTimezone(user) {
  // Check if the user's timezone information is present
  if (!user.timezoneId || !user.timezoneId.name) {
    throw new Error("Timezone information is missing for the user.");
  }

  const time = new Date(); // Get the current time
  const GMT = await sails.helpers.timeGmt(); // Get the current time in GMT

  let hourUser;
  // Extract the numeric value from the timezone name
  const timezoneOffset = parseInt(await sails.helpers.getNumbers(user.timezoneId.name));

  // Check if we need to add or subtract the hour based on the timezone offset
  if (user.timezoneId.name[0] === '+') {
    hourUser = parseInt(GMT) + timezoneOffset;
  } else if (GMT === 0) {
    hourUser = 24 - timezoneOffset;
  } else {
    hourUser = parseInt(GMT) - timezoneOffset;
    if (hourUser < 0) {
      hourUser += 24; // Adjust for negative hours
    }
  }

  // Adjust the hour to be within 24h format
  if (hourUser > 23) {
    hourUser -= 24;
  }
  hourUser = Math.abs(hourUser); // Ensure hourUser is positive

  // Format the minutes and hours to always have two digits
  const minutes = time.getUTCMinutes() < 10 ? '0' + time.getUTCMinutes() : time.getUTCMinutes();
  const hour = hourUser < 10 ? '0' + hourUser : hourUser;

  // Return the formatted time in HH:MM format
  return hour + ':' + minutes;
}

module.exports = {
  // Action to handle user signup
  signup: async function (req, res) {
    try {
      if (req.method === 'POST') {
        const {
          fullName,
          emailAddress,
          password,
          birthday,
          countryPov,
          aboutMe,
          gender,
          countryId,
          educationId,
          userType,
          timezoneId,
        } = req.body;

        // Check if the email is already in use
        const existingUser = await User.findOne({ emailAddress });
        if (existingUser) {
          return res.status(409).json({ error: 'Email address is already in use.' });
        }

        // Encrypt the password
        const hashedPassword = await sails.helpers.hashPassword(password);

        // Create the new user
        const newUser = await User.create({
          fullName,
          emailAddress,
          password: hashedPassword,
          birthday,
          countryPov,
          aboutMe,
          gender,
          countryId,
          educationId,
          userType,
          timezoneId,
        }).fetch();

        // Set user session
        req.session.userId = newUser.id;

        // Return success response
        return res.status(200).json({ message: 'Signup successful' });
      }

      // Fetch all countries and timezones
      const countries = await Country.find();
      const timezones = await Timezone.find();

      // Render the signup page with colected data
      return res.view('pages/user/signup', { countries, timezones });
    } catch (error) {
      sails.log.error('Error occurred during signup:', error);
      return res.status(500).json({
        error: 'An error occurred during signup.',
        details: error.message,
      });
    }
  },

  // Action to update the logged-in user's details
  updateUser: async function (req, res) {
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    const {
      fullName,
      birthday,
      countryPov,
      aboutMe,
      gender,
      timezoneId,
      personalProfileType,
    } = req.body;

    try {
      const updatedFields = {
        fullName,
        countryPov,
        aboutMe,
        gender,
        timezoneId,
        personalProfileType,
      };

      // Handle birthday if provided
      if (birthday) {
        updatedFields.birthday = birthday;
      }

      const updatedUser = await User.updateOne({ id: req.session.userId }).set(
        updatedFields
      );

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (updatedUser.personalProfileType === '') {
        return res.redirect('/questions/personal-type');
      } else {
        return res.redirect('/me');
      }
    } catch (error) {
      sails.log.error('Error updating user profile:', error);
      return res
        .status(500)
        .json({
          error: 'An error occurred while updating the profile.',
          details: error.message,
        });
    }
  },

  // Action to handle user login
  login: async function (req, res) {
    try {
      const { emailAddress, password } = req.body;

      // Find the user by email address
      const user = await User.findOne({ emailAddress });
      if (!user) {
        return res.view('pages/entrance/login', { error: 'User not found' });
      }

      // Check the password
      await sails.helpers.checkPassword
        .with({ password, hashedPassword: user.password })
        .intercept('incorrect', () => {
          return res.view('pages/entrance/login', { error: 'Invalid password' });
        });

      // Set user session
      req.session.userId = user.id;

      // Update last seen timestamp
      await User.updateOne({ id: user.id }).set({ lastSeenAt: Date.now() });

      // Redirect to /me
      return res.redirect( '/me');
    } catch (error) {
      sails.log.error('Error occurred during login:', error);
      return res
        .status(500)
        .json({
          error: 'An error occurred during login.',
          details: error.message,
        });
    }
  },

  // Action to get the logged-in user's details
  getCurrentUser: async function (req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }

      // Find the user by id and populate timezone and country
      const user = await User.findOne({ id: userId })
        .populate('timezoneId')
        .populate('countryId');
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Fetch the group the user belongs to, if any
      const studentGroup = await StudentsTeam.findOne({
        userId: user.id,
      }).populate('groupId');

      let group = null;
      let groupMembers = [];
      let tutor = null;

      // If the user is part of a group, fetch group members and tutor
      if (studentGroup && studentGroup.groupId) {
        group = studentGroup.groupId;

        // Fetch all users in the same group
        const groupStudents = await StudentsTeam.find({
          groupId: group.id,
        }).populate('userId');
        groupMembers = await Promise.all(
          groupStudents.map(async (studentTeam) => {
            const member = await User.findOne({ id: studentTeam.userId.id })
              .populate('timezoneId')
              .populate('countryId');

            // Handle missing timezoneId
            if (member && member.timezoneId) {
              member.timeUser = await configureUserTimezone(member);
            } else {
              member.timeUser = 'N/A';
            }

            return member;
          })
        );

        // Fetch the tutor and populate timezone
        tutor = await User.findOne({ id: group.tutorId })
          .populate('timezoneId')
          .populate('countryId');
        if (tutor) {
          tutor.timeUser = tutor.timezoneId
            ? await configureUserTimezone(tutor)
            : 'N/A';
        }
      }

      // Configure user timezone
      const timeUser = user.timezoneId
        ? await configureUserTimezone(user)
        : 'N/A';

      // Configure user birthday
      const dateUser = await sails.helpers.formatDate(user.birthday);

      // Return the user and the group members (without passwords)
      const sanitizedUser = _.omit(user, ['password']);

      return res.view('pages/user/account-overview', {
        user: sanitizedUser,
        groupMembers: groupMembers,
        timeUser: timeUser,
        tutor: tutor,
        dateUser: dateUser,
      });
    } catch (error) {
      sails.log.error('Error occurred while retrieving user details:', error);
      return res
        .status(500)
        .json({
          error: 'An error occurred while retrieving user details.',
          details: error.message,
        });
    }
  },

  // Action to edit the logged-in user's details
  editCurrentUser: async function (req, res) {
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    try {
      const user = await User.findOne({ id: req.session.userId });
      const timezones = await Timezone.find();

      if (!user) {
        return res.redirect('/login');
      }

      return res.view('pages/user/edit', { user, timezones });
    } catch (error) {
      sails.log.error('Error fetching user details:', error);
      return res
        .status(500)
        .json({
          error: 'An error occurred while fetching user details.',
          details: error.message,
        });
    }
  },

  // Action to handle user logout
  logout: async function (req, res) {
    sails.log.info('Logout request received.');
    try {
      // Destroy the user's session
      req.session.userId = null;

      return res.redirect('/login');
    } catch (error) {
      sails.log.error('Error occurred during logout:', error);
      return res
        .status(500)
        .json({
          error: 'An error occurred during logout.',
          details: error.message,
        });
    }
  },

  // Action to update the user's photo
  updatePhoto: async function (req, res) {
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    try {
      // Handle file upload
      req.file('photo').upload(
        {
          maxBytes: 10000000, // Limit file size to 10MB
        },
        async function (err, uploadedFiles) {
          if (err) {
            sails.log.error('File upload error:', err);
            return res.serverError(err);
          }

          if (uploadedFiles.length === 0) {
            return res.badRequest('No file was uploaded.');
          }

          const filePath = uploadedFiles[0].fd;

          try {
            // Upload to Cloudinary
            const result = await cloudinary.uploader.upload(filePath);
            const photoUrl = result.secure_url;

            // Update user's photo URL
            await User.updateOne({ id: req.session.userId }).set({
              photo: photoUrl,
            });

            return res.redirect('/me');
          } catch (uploadErr) {
            sails.log.error('Cloudinary upload error:', uploadErr);
            return res.serverError(uploadErr);
          }
        }
      );
    } catch (error) {
      sails.log.error('Unhandled error during photo update:', error);
      return res.serverError(error);
    }
  },

  forgotPassword: async function (req, res) {
    try {
      const { emailAddress, newPassword } = req.body;

      // Check if the email address is provided
      if (!emailAddress) {
        return res.status(400).json({ error: 'Email address is required.' });
      }

      if (!newPassword) {
        return res.status(400).json({ error: 'A new password is required.' });
      }

      // Find the user by email address and return status 404 if not found
      const user = await User.findOne({ emailAddress: emailAddress });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }

      // Hash the new password
      const hashedPassword = await sails.helpers.hashPassword.with({ password: newPassword });
      if (hashedPassword === user.password) {
        return res.json({ error: 'the new password cannot be the same as the previous one'});
      }

      // Update the user's password
      await User.updateOne({ id: user.id }).set({ password: hashedPassword });

      // Redirect to login page
      return res.redirect('/login');
    } catch (error) {
      // Log specific error details
      sails.log.error('Error occurred during password reset:', error.message, error.stack);
      return res.status(500).json({ error: 'Internal server error.' });
    }
  }
};
