/**
 * Universe.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of Universe table attributes
  //Associations
  attributes: {
    //Associations
    // universe association with the 'game' table
    gameId: {
      model: 'game',
      required: true
    },
    // universe association with the 'group' table
    groups: {
      collection: 'group',
      via: 'universeId'
    }
  }
};
