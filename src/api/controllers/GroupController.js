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
  create: async function (req, res) {
    // Check if the user is a tutor
    const isTutor = await sails.helpers.isTutor.with({ req })
      .intercept('redirect', () => res.redirect('/login')) // Redirect to login if not authenticated
      .intercept('forbidden', () => res.forbidden());

    // Handle POST request for group creation
    if (req.method === 'POST') {
      try {
        const { name, tutorId, studentIds, universeId } = req.body;

        let studentsArray = studentIds;

        // Convert studentIds from a comma-separated string to an array
        if (typeof studentIds === 'string' && studentIds.length > 0) {
          studentsArray = studentIds.split(',').map(id => id.trim());
          studentsArray = studentsArray.filter(id => id !== '');
        } else {
          return res.view('pages/user/error', { errorType: 'assignStudents' })
        }

        // Create a new group with the provided data
        const newGroup = await Group.create({
          name,
          tutorId,
          universeId
        }).fetch();

        sails.log.debug('Creating group with students:', studentsArray);

        // If students are provided, create entries in the StudentsTeam table
        if (studentsArray && studentsArray.length > 0) {
          const students = studentsArray.map(id => ({
            groupId: newGroup.id,
            userId: id
          }));
          await StudentsTeam.createEach(students);
        }

        // Redirect to the universe page after group creation
        return res.redirect('/universe/' + universeId);
      } catch (error) {
        sails.log.error('Error during group creation:', error);
        return res.status(500).json({ error: 'An error occurred during group creation.', details: error.message });
      }
    }

    // Fetch data for the group creation form
    const universe = await Universe.findOne({ id: req.query.universeId });
    const tutors = await User.find({ userType: 'tutor' });
    const students = await User.find({ userType: 'student' });

    // Fetch user details for the current session
    const userId = req.session.userId
    const user = await User.findOne({ id: userId })

    // Render the group creation form
    return res.view('pages/group/create', {
      user,
      tutors,
      students,
      universe
    });
  },

  show: async function (req, res) {
    const user = await User.findOne({ id: req.session.userId });
    if (!user) {
      return res.redirect('/login');
    }

    try {
      const userId = req.session.userId;

      const user = await User.findOne({ id: userId })

      // Fetch the group the user belongs to, if any
      const studentGroup = await StudentsTeam.findOne({ userId: userId }).populate('groupId');

      let group = null;
      let groupMembers = [];
      let tutor = null;

      if (studentGroup === undefined) {
        let errorType = 'noGroup'
        return res.view('pages/user/error', { errorType });
      }


      // If the user is part of a group, fetch group members and tutor
      if (studentGroup && studentGroup.groupId) {
        group = studentGroup.groupId;

        // Fetch all users in the same group
        const groupStudents = await StudentsTeam.find({ groupId: group.id }).populate('userId');
        groupMembers = groupStudents.map(studentTeam => studentTeam.userId);
        tutor = await User.findOne({ id: group.tutorId }).populate('countryId').populate('timezoneId');
        tutor.timeUser = tutor.timezoneId ? await configureUserTimezone(tutor) : 'N/A';
      }

      // Iterate through each student and calculate their profile type
      for (const student of groupMembers) {
        const feedbacks = await QuestionAnswer.find({ userId: student.id, toUserId: userId });
        const studentObject = await User.findOne({ id: student.id }).populate('countryId').populate('timezoneId');
        const country = await Country.findOne({ id: studentObject.countryId.id });
        const timezone = await Timezone.findOne({ id: studentObject.timezoneId.id });

        if (!feedbacks || feedbacks.length === 0) {
          studentObject.externalProfileType = 'No feedbacks received';
        } else {
          const typeCounts = {
            conformist: 0,
            initiator: 0,
            analyst: 0,
            harmonizer: 0,
            director: 0
          };

          // Count the number of feedbacks for each profile type
          feedbacks.forEach(feedback => {
            if (feedback.questionType && feedback.questionType.length > 1) {
              const questionTypes = feedback.questionType.split(','); // Split the string into an array
              const questionType = questionTypes[1]; // Get the second element
              sails.log.debug(`Feedback questionType: ${questionType}, questionAnswer: ${feedback.questionAnswer}`);
              if (typeCounts.hasOwnProperty(questionType)) {
                typeCounts[questionType] += feedback.questionAnswer; // Ensure questionAnswer is the correct field
              }
            } else {
              sails.log.debug('Feedback questionType does not have sufficient length or is undefined:', feedback.questionType);
            }
          });

          // Determine the profile type with the highest count
          let externalProfileType = 'Unknown';
          let maxCount = 0;

          for (const [type, count] of Object.entries(typeCounts)) {
            if (count > maxCount) {
              maxCount = count;
              externalProfileType = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize first letter
            }
          }
          studentObject.externalProfileType = externalProfileType;
        }
        student.externalProfileType = studentObject.externalProfileType;
        student.countryId = country;
        student.timezoneId = timezone;

        // Configure the user's timezone for display
        if (student && student.timezoneId) {
          student.timeUser = await configureUserTimezone(student);
        } else {
          student.timeUser = 'N/A';
        }
      }

      // Render the group details page
      return res.view('pages/group/show', { group, groupMembers, tutor, user });
    } catch (error) {
      sails.log.error('Error fetching group details:', error);
      return res.status(500).json({ error: 'An error occurred while fetching group details.', details: error.message });
    }
  },

  findUserByEmail: async function (req, res) {
    try {
      const query = req.query.emailAddress;
      if (!query) {
        return res.json([]);
      }

      // Search for users by email address
      const users = await User.find({
        where: { emailAddress: { contains: query } },
        limit: 10
      });

      return res.json(users);
    } catch (error) {
      sails.log.error('Error occurred during email search:', error);
      return res.status(500).json({ error: 'User was not found.', details: error.message });
    }
  },

  externalProfile: async function (req, res) {
    try {
      // Check if the user is logged in
      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }

      // Fetch the current user's details
      const user = await User.findOne({ id: userId })

      const profileId = req.params.id;

      // Fetch the profile of the teammate
      const teammate = await User.findOne({ id: profileId }).populate('countryId').populate('timezoneId');

      if (!teammate) {
        return res.status(404).json({ error: 'Teammate not found' });
      }

      // Configure the timezone and format the birthday for display
      const timeTeammate = teammate.timezoneId ? await configureUserTimezone(teammate) : 'N/A';
      const dateTeammate = await sails.helpers.formatDate(teammate.birthday);

      // Render the external profile page
      return res.view('pages/user/external-profile/', {
        teammate: teammate,
        timeTeammate: timeTeammate,
        dateTeammate: dateTeammate,
        user: user
      });
    } catch (error) {
      return res.status(500).json({ error: 'Error in finding teammate', details: error.message });
    }
  },

  // ------------- EDIT GROUP ------------------
  // methods for editing the group
  showAdmin: async function (req, res) {
    const isTutor = await sails.helpers.isTutor.with({ req })
      .intercept('redirect', () => res.redirect('/login')) // Redirect to login if not authenticated
      .intercept('forbidden', () => res.forbidden()); // Return 403 if the user is not an admin
    try {
      // Get group id from params
      const groupId = req.params.id;
      let group = await Group.findOne({ id: groupId })
        .populate('students')
        .populate('tutorId')
        .populate('universeId');

      if (!group) {
        return res.status(404).json({ error: 'Group not found' + error });
      }

      // Find each user from the group
      for (let student of group.students) {
        student.userId = await User.findOne({ id: student.userId });
      }

      const tutors = await User.find({ userType: 'tutor' });
      const students = await User.find({ userType: 'student' });

      return res.view('pages/group/showAdmin', {
        group,
        tutors,
        students
      });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred' + error });
    }
  },

  addStudent: async function (req, res) {
    const isTutor = await sails.helpers.isTutor.with({ req })
      .intercept('redirect', () => res.redirect('/login')) // Redirect to login if not authenticated
      .intercept('forbidden', () => res.forbidden()); // Return 403 if the user is not an admin
    try {
      const groupId = req.params.id;
      const { userId } = req.body;

      await StudentsTeam.create({ groupId, userId });

      return res.status(200).json({ message: 'Student added successfully' });
    } catch (error) {
      sails.log.error('Error adding student:', error);
      return res.status(500).json({ error: 'An error occurred while adding the student.', details: error.message });
    }
  },

  removeStudent: async function (req, res) {
    const isTutor = await sails.helpers.isTutor.with({ req })
      .intercept('redirect', () => res.redirect('/login')) // Redirect to login if not authenticated
      .intercept('forbidden', () => res.forbidden()); // Return 403 if the user is not an admin
    try {
      const { studentId } = req.body;

      await StudentsTeam.destroy({ id: studentId });

      return res.status(200).json({ message: 'Student removed successfully' });
    } catch (error) {
      sails.log.error('Error removing student:', error);
      return res.status(500).json({ error: 'An error occurred while removing the student.', details: error.message });
    }
  },

  update: async function (req, res) {
    const isTutor = await sails.helpers.isTutor.with({ req })
      .intercept('redirect', () => res.redirect('/login')) // Redirect to login if not authenticated
      .intercept('forbidden', () => res.forbidden()); // Return 403 if the user is not an admin
    try {
      const groupId = req.params.id;
      const { name, tutorId } = req.body;

      const updatedGroup = await Group.updateOne({ id: groupId }).set({ name, tutorId });

      if (!updatedGroup) {
        return res.status(404).json({ error: 'Group not found' });
      }

      return res.json({ message: 'Group updated successfully', group: updatedGroup });
    } catch (error) {
      sails.log.error('Error updating group:', error);
      return res.status(500).json({ error: 'An error occurred while updating the group.', details: error.message });
    }
  },
};
