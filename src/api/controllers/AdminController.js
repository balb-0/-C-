/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // Action to render the admin dashboard
  dashboard: async function (req, res) {  
    // Check if the user is an admin
    const isAdmin = await sails.helpers.isAdmin.with({ req })
      .intercept('redirect', () => res.redirect('/login')) // Redirect to login if not authenticated
      .intercept('forbidden', () => res.forbidden()); // Return 403 if the user is not an admin

    const userId = req.session.userId;
    const user = await User.findOne({ id: userId });

    try {
      // Fetch all games from the database
      const games = await Game.find();
      // Render the admin dashboard view with the fetched games
      return res.view('pages/admin', { games, user });
    } catch (error) {
      // Log the error and return a 500 status with an error message
      sails.log.error('Error fetching games:', error);
      return res.status(500).json({ error: 'An error occurred while fetching games.', details: error.message });
    }
  }
};
