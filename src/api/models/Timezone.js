/**
 * Timezone.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of Timezone table attributes  
  attributes: {
    // attribute that stores the names of the timezones
    name: {
      type: 'string',
      required: true
    },
    //Associations
    // timezone association with the 'user' table
    users: {
      collection: 'user',
      via: 'timezoneId'
    }
  }
};
