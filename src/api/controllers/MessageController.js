module.exports = {
  // Action to create a new message
  create: async function (req, res) {
    try {
      const userId = req.session.userId;
      if (!userId) {
        return res.redirect('/login');
      }

      const { content } = req.body;
      if (!content) {
        console.error('Message content is required');
        return res.status(400).json({ error: 'Message content is required' });
      }

      // Fetch the user's group ID
      const studentGroup = await StudentsTeam.findOne({ userId: userId }).populate('groupId');
      if (!studentGroup || !studentGroup.groupId) {
        console.error('User is not associated with any group');
        return res.status(400).json({ error: 'User is not associated with any group' });
      }

      const groupId = studentGroup.groupId.id;

      // Create and save the new message
      const newMessage = await Message.create({
        content: content,
        userId: userId,
        groupId: groupId, // Include the group ID
        date: new Date(),
      }).fetch(); // Ensure the created message is returned

      console.log('New message created:', newMessage);
      return res.json(newMessage);
    } catch (error) {
      console.error('Error creating message:', error);
      return res.status(500).json({ error: 'Error creating message' });
    }
  },

  // Action to list all messages
  list: async function (req, res) {
    try {
      // Fetch all messages and populate user information
      const messages = await Message.find({}).populate('userId');
      console.log('Messages found:', messages);

      // Render the homepage with the messages
      return res.view('pages/homepage', { messages });
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ error: 'Error fetching messages' });
    }
  },
};
