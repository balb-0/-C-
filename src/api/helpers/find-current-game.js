module.exports = {
  friendlyName: 'Find current game',

  description: 'Find the current game based on the current date and time.',

  inputs: {
    // No inputs required for finding the current game
  },

  exits: {
    success: {
      description: 'Current game found.'
    },
    notFound: {
      description: 'No current game found.'
    }
  },

  fn: async function (inputs, exits) {
    const currentDateTime = new Date();

    const currentGame = await Game.findOne({
      where: {
        startDate: { '<=': currentDateTime },
        endDate: { '>=': currentDateTime }
      }
    }).populate('universes');

    if (!currentGame) {
      return exits.notFound();
    }

    return exits.success(currentGame);
  }
};
