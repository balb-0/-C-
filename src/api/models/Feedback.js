/**
 * Feedback.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of Feedback table attributes  
  attributes: {
    // attribute that stores the content of the Feedback
    content: {
      type: 'string',
      required: true
    },
    // attribute that stores the feedback creation date    
    date: {
      type: 'ref',
      columnType: 'timestamp',
      required: true
    },
    // Associations
    // feedback association with the 'user' table
    fromUserId: {
      model: 'user',
      required: true
    },
    // feedback association with the 'user' table
    toUserId: {
      model: 'user',
      required: true
    },
    // feedback association with the 'round' table
    roundId: {
      model: 'round',
      required: true
    },
  }
};
