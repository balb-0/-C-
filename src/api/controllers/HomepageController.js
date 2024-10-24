/**
 * HomepageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
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
  overview: async function (req, res) {
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    try {
      const user = await User.findOne({ id: req.session.userId });
      if (!user) {
        return res.redirect('/login');
      } else if (user.userType === 'admin') {
        let errorType = 'noGroup'
        return res.view('pages/user/error', { errorType });
      }

      const studentGroup = await StudentsTeam.findOne({ userId: user.id }).populate('groupId');
      const countryId = user.countryId;

      const currentGame = await sails.helpers.findCurrentGame()
        .intercept('notFound', () => {
          return res.notFound({ error: 'No current game found.' });
        });
      const currentRound = await sails.helpers.findCurrentRound(currentGame.id)
        .intercept('notFound', () => {
          return res.notFound({ error: 'No current round found for the given game.' });
        });

      let group = null;
      let groupMembers = [];
      let tutor = null;
      let messages = [];

      if (studentGroup && studentGroup.groupId) {
        group = studentGroup.groupId;
        const groupStudents = await StudentsTeam.find({ groupId: group.id }).populate('userId');
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

        // Filter messages by the user's group ID
        messages = await Message.find({ groupId: group.id }).populate('userId');
      }

      return res.view('pages/homepage', { user, group, groupMembers, tutor, messages, countryId, currentRound });
    } catch (error) {
      sails.log.error('Error fetching user or group information:', error);
      return res.status(500).json({ error: 'An error occurred while fetching user or group information.', details: error.message });
    }
  },


  happinessMeter: async function (req, res) {
    try {
      const user = await User.findOne({ id: req.session.userId });
      if (!user) {
        return res.redirect('/login');
      }

      const happinessValue = req.body.happiness;
      if (!happinessValue || happinessValue < 1 || happinessValue > 5) {
        return res.badRequest('Invalid happiness value.');
      }

      await User.updateOne({ id: req.session.userId }).set({ happinessMeter: happinessValue });

      return res.json({ message: 'Happiness level updated successfully!' });
    } catch (error) {
      sails.log.error('Error updating happinessMeter:', error);
      return res.status(500).json({ error: 'Failed to update happiness level.', details: error.message });
    }
  }
};
