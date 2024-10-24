/**
 * University.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of University table attributes  
  attributes: {
    // attribute that stores the name of the university
    name: {
      type: 'string',
      required: true,
      unique: true,
    },

    // Associations
    // university association with the 'education' table
    educations: {
      collection: 'education',
      via: 'universityId'
    },
    // university association with the 'country' table
    countryId: {
      model: 'country',
      required: true
    },
  },

};
