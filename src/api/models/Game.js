/**
 * Game.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of Game table attributes
  attributes: {
    // attribute that stores the start date of the game
    startDate: {
      type: 'ref',
      columnType: 'timestamp'
    },
    // attribute that stores the end date of the game
    endDate: {
      type: 'ref',
      columnType: 'timestamp'
    },

    // Associations
    // game association with the 'round' table
    rounds: {
      collection: 'round',
      via: 'game'
    },
    // game association with the 'universe' table
    universes: {
      collection: 'universe',
      via: 'gameId'
    },

  },

};
