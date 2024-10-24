/**
 * Education.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of Education table attributes  
  attributes: {
    // attribute that stores the course's name
    name: {
      type: 'string',
      required: true
    },
    // attribute that stores the educationLevel 
    educationLevel: {
      type: 'string'
    },
    // Associations
    // education association with the 'user' table
    users: {
      collection: 'user',
      via: 'educationId'
    },
    // education association with the 'university' table
    universityId: {
      model: 'university'
    },

  },

};
