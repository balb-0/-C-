/**
 * Round.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of Round table attributes
  attributes: {
    // attribute that stores the start date of the round
    startDate: {
      type: 'ref',
      columnType: 'timestamp'
    },
    // attribute that stores the end date of the round
    endDate: {
      type: 'ref',
      columnType: 'timestamp'
    },
    // attribute that stores the round number
    roundNumber: {
      type: 'number',
      required: true
    },
    // attribute that stores the explanation of the round
    explanation: {
      type: 'string',
      required: true
    },
    // Associations
    // round association with the 'game' table
    game: {
      model: 'game',
      required: true
    },

  },

};
