/**
 * QuestionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  personalType: async function (req, res) {
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    try {
      if (req.method === 'GET') {
        sails.log.debug('Starting query for decision_making questions');
        let questionType = 'decision_making'
        let questions = await Question.findByQuestionType(questionType);
        sails.log.debug('Query completed');
        return res.view('pages/questions/personal-type', { questions, questionType });
      } else if (req.method === 'POST') {
        const userId = req.session.userId;
        const answers = req.body.answers;

        if (!Array.isArray(answers)) {
          sails.log.debug(answers);
          return res.status(400).json({ error: 'Invalid answers format' });
        }

        for (const answer of Object.values(answers)) {
          const { questionId, questionAnswer, questionType } = answer;
          await QuestionAnswer.create({
            questionAnswer: parseInt(questionAnswer, 10),
            date: new Date().toISOString(),
            userId: userId,
            questionId: questionId,
            questionType: questionType
          });
        }

        return res.redirect('/questions/profile-result'); // Redirect to an appropriate page
      }
    } catch (error) {
      sails.log.error('Error fetching questions or saving answers:', error);
      return res.status(500).json({ error: 'Error processing request', details: error.message });
    }
  },

  externalType: async function (req, res) {
    if (!req.session.userId) { // Is logged check
      return res.redirect('/login');
    }
    // Fetch current user
    const user = await User.findOne({ id: req.session.userId });
    // Fetch the group the user belongs to, if any
    const studentGroup = await StudentsTeam.findOne({ userId: user.id }).populate('groupId');
    let group = null;
    let groupMembers = [];

    // If the user is part of a group, fetch group members
    if (studentGroup && studentGroup.groupId) {
      group = studentGroup.groupId;

      // Fetch all users in the same group
      const groupStudents = await StudentsTeam.find({ groupId: group.id }).populate('userId');
      groupMembers = groupStudents.map(studentTeam => studentTeam.userId);
    } else {
      let errorType = 'noGroup'
      return res.view('pages/user/error', { errorType });
    }

    try {
      if (req.method === 'GET') {
        sails.log.debug('Starting query for collaboration questions');
        let questionType = 'collaboration'
        let questions = await Question.findByQuestionType(questionType);
        sails.log.debug('Query completed');

        return res.view('pages/questions/personal-type', { questions, questionType, group, groupMembers, user });
      } else if (req.method === 'POST') {
        const userId = req.session.userId;
        const answers = req.body.answers;
        const toUserId = req.body.toUserId;

        if (!Array.isArray(answers)) {
          sails.log.debug(answers);
          return res.status(400).json({ error: 'Invalid answers format' });
        }

        for (const answer of Object.values(answers)) {
          const { questionId, questionAnswer, questionType } = answer;
          await QuestionAnswer.create({
            questionAnswer: parseInt(questionAnswer, 10),
            date: new Date().toISOString(),
            userId: userId,
            questionId: questionId,
            questionType: questionType,
            toUserId: toUserId,
          });
        }
        return res.redirect('/me');
      }
    } catch (error) {
      sails.log.error('Error fetching questions:', error);
      return res.status(500).json({ error: 'Error fetching questions', details: error.message });
    }
  },

  profileResult: async function (req, res) {
    try {
      if (!req.session.userId) {
        return res.redirect('/login');
      }
      const userId = req.session.userId;
      const user = await User.findOne({ id: userId });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const profileType = await QuestionAnswer.calculateProfileByAnswerType(user.id, 'decision_making');

      // Update the user's personalProfileType field with the calculated profileType
      await User.updateOne({ id: userId }).set({ personalProfileType: profileType });

      return res.view('pages/user/results-self-evaluation', { profileType });
    } catch (error) {
      sails.log.error('Error fetching answers:', error);
      return res.status(500).json({ error: 'Error fetching answers', details: error.message });
    }
  },

};
