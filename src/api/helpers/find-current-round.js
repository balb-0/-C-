module.exports = {
  friendlyName: 'Find current round',

  description: 'Find the current round for a given game based on the current date and time.',

  inputs: {
    gameId: {
      type: 'number',
      required: true,
      description: 'The ID of the game to find the current round for.'
    }
  },

  exits: {
    success: {
      description: 'Current or last finished round found.'
    },
    notFound: {
      description: 'No current or finished round found for the given game.'
    }
  },

  fn: async function (inputs, exits) {
    const currentDateTime = new Date();

    // Find the current round
    let currentRound = await Round.findOne({
      where: {
        game: inputs.gameId,
        startDate: { '<=': currentDateTime },
        endDate: { '>=': currentDateTime }
      }
    });

    // If no current round is found, find the last finished round
    if (!currentRound) {
      currentRound = await Round.findOne({
        where: {
          game: inputs.gameId,
          endDate: { '<': currentDateTime }
        },
        sort: 'endDate DESC'
      });
    }

    // If no current or finished round is found, exit with notFound
    if (!currentRound) {
      return exits.notFound();
    }

    // Return the current or last finished round
    return exits.success(currentRound);
  }
};
