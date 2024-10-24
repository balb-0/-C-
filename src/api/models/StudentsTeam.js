/**
 * StudentsTeam.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of StudentsTeam table attributes
  attributes: {
    // Associations
    // StudentsTeam association with the 'group' table
    groupId: {
      model: 'group',
      required: true,
    },
    // StudentsTeam association with the 'user' table
    userId: {
      model: 'user',
      required: true,
      unique: true,
    }

  },

};
