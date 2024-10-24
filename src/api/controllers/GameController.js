module.exports = {
  // Action to create a new game
  create: async function (req, res) {
    // Check if the user is an admin
    const isTutor = await sails.helpers.isTutor.with({ req })
      .intercept('redirect', () => res.redirect('/login')) // Redirect to login if not authenticated
      .intercept('forbidden', () => res.forbidden()); // Return 403 if the user is not an admin

    // Handle POST request to create a game
    if (req.method === 'POST') {
      try {
        // Extract game details from the request body
        const { startDate, endDate, numRounds, roundStartDates, roundEndDates, explanations, roundNumbers } = req.body;

        // Check for overlapping games
        const overlappingGames = await Game.find({
          or: [
            { startDate: { '<=': endDate }, endDate: { '>=': startDate } }
          ]
        });

        if (overlappingGames.length > 0) {
          return res.view('pages/game/create', { error: 'There is already a game happening during the specified time period.' });
        }

        // Create and save the new game
        const newGame = await Game.create({ startDate, endDate }).fetch();

        // Create the rounds
        sails.log.debug('Explanations:', explanations);
        for (let i = 0; i < numRounds; i++) {
          await Round.create({
            game: newGame.id,
            startDate: roundStartDates[i],
            endDate: roundEndDates[i],
            explanation: explanations[i],
            roundNumber: roundNumbers[i]
          });
        }

        return res.redirect('/admin');
      } catch (error) {
        // Log the error and return a 500 status with an error message
        sails.log.error('Error creating game:', error);
        return res.status(500).json({ error: 'An error occurred during game creation.', details: error.message });
      }
    }

    const userId = req.session.userId;
    const user = await User.findOne({ id: userId });
    // Render the game creation page
    return res.view('pages/game/create', { user });
  },

  // Action to show game details
  show: async function (req, res) {
    // Check if the user is an admin
    const isTutor = await sails.helpers.isTutor.with({ req })
      .intercept('redirect', () => res.redirect('/login')) // Redirect to login if not authenticated
      .intercept('forbidden', () => res.forbidden()); // Return 403 if the user is not an admin


    const userId = req.session.userId;
    const user = await User.findOne({ id: userId });

    try {
      // Fetch the game details along with its universes
      const game = await sails.helpers.findCurrentGame();
      if (!game) {
        return res.notFound('Game not found.');
      }
      // Render the game details page
      return res.view('pages/game/show', { game, user });
    } catch (error) {
      // Log the error and return a 500 status with an error message
      sails.log.error('Error fetching game details:', error);
      return res.status(500).json({ error: 'An error occurred while fetching game details.', details: error.message });
    }
  }
};
