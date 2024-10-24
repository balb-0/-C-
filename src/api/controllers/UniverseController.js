module.exports = {
  // Action to create a new universe
  create: async function (req, res) {
    // Check if the user is an admin
    const isTutor = await sails.helpers.isTutor.with({ req })
      .intercept('redirect', () => res.redirect('/login')) // Redirect to login if not authenticated
      .intercept('forbidden', () => res.forbidden()); // Return 403 if the user is not an admin

      const userId = req.session.userId;
      const user = await User.findOne({ id: userId }); // Assuming req.user is populated with user details

    // Handle POST request to create a universe
    if (req.method === 'POST') {
      try {
        // Extract game ID from the request body
        const { gameId } = req.body;
        const game = await sails.helpers.findCurrentGame();
        // Create and save the new universe
        const newUniverse = await Universe.create({ gameId }).fetch();
        return res.view('pages/game/show', { game, user })
      } catch (error) {
        // Log the error and return a 500 status with an error message
        sails.log.error('Error creating universe:', error);
        return res.status(500).json({ error: 'An error occurred during universe creation.', details: error.message });
      }
    }

    // Fetch the specific game
    const game = await Game.findOne({ id: req.query.gameId });

    // Render the universe creation page
    return res.view('pages/universe/create', { game, user });
  },

  // Action to show universe details
  show: async function (req, res) {
    // Check if the user is an admin
    const isTutor = await sails.helpers.isTutor.with({ req })
      .intercept('redirect', () => res.redirect('/login')) // Redirect to login if not authenticated
      .intercept('forbidden', () => res.forbidden()); // Return 403 if the user is not an admin


    const userId = req.session.userId;
    const user = await User.findOne({ id: userId });
    
    try {
      // Fetch the universe details along with its groups
      const universe = await Universe.findOne({ id: req.params.id }).populate('groups');
      if (!universe) {
        return res.notFound('Universe not found.');
      }
      // Render the universe details page
      return res.view('pages/universe/show', { universe, user });
    } catch (error) {
      // Log the error and return a 500 status with an error message
      sails.log.error('Error fetching universe details:', error);
      return res.status(500).json({ error: 'An error occurred while fetching universe details.', details: error.message });
    }
  }
};
