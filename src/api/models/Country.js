/**
 * Country.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of Country table attributes
  attributes: {
    //attribute that stores the name of the country
    name: {
      type: 'string',
      required: true
    }, 
    //attribute that stores the svg icon, of the country
    svgIcon: {
      type: 'string',
    },

    // Associations
    // country association with the 'user' table
    users: {
      collection: 'user',
      via: 'countryId'
    },
    // country association with the 'university' table
    universities: {
      collection: 'university',
      via: 'countryId'
    }

  },

};
