/**
 * FeedbackController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Action to handle both rendering the feedback page and creating new feedback
  create: async function (req, res) {
    // Check if the user is logged in
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    // Handle POST request to create feedback
    if (req.method === 'POST') {
      try {
        // Extract feedback details from the request body
        const { toUserId, content } = req.body;
        const fromUserId = req.session.userId; // Get the ID of the logged-in user
        const date = new Date();

        // Validate the required fields
        if (!fromUserId || !toUserId || !content) {
          return res.badRequest({ error: 'All fields are required' });
        }

        // Check if the recipient user exists
        const recipientUser = await User.findOne({ id: toUserId });
        if (!recipientUser) {
          return res.badRequest({ error: 'Recipient user does not exist' });
        }

        const currentGame = await sails.helpers.findCurrentGame()
          .intercept('notFound', () => {
            return res.notFound({ error: 'No current game found.' });
          });
        const currentRound = await sails.helpers.findCurrentRound(currentGame.id)
          .intercept('notFound', () => {
            return res.notFound({ error: 'No current round found for the given game.' });
          });

        // Create and save the new feedback
        const newFeedback = await Feedback.create({
          fromUserId,
          toUserId,
          roundId: currentRound.id,
          content,
          date,
        }).fetch();
        return res.redirect('/feedback');
      } catch (error) {
        return res.badRequest({ error: error.message });
      }
    }

    // Fetch the logged-in user details
    const loggedInUser = await User.findOne({ id: req.session.userId });

    const studentGroup = await StudentsTeam.findOne({ userId: loggedInUser.id }).populate('groupId');
    let group = null;
    let groupMembers = [];

    if (studentGroup && studentGroup.groupId) {
      group = studentGroup.groupId;
      const groupStudents = await StudentsTeam.find({ groupId: group.id }).populate('userId');
      groupMembers = groupStudents.map(studentTeam => studentTeam.userId);
    }

    // Fetch only feedbacks addressed to the logged-in user
    const feedbacks = await Feedback.find({ toUserId: req.session.userId })
      .populate('fromUserId')
      .populate('toUserId');

    // Render the feedback page with group members and feedbacks
    return res.view('pages/feedback/create', {
      user: loggedInUser,
      groupMembers: groupMembers,
      feedbacks: feedbacks,
    });
  },
};
