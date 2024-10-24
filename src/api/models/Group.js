/**
 * Group.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of Group table attributes
  attributes: {
    // attribute that stores the group's name
    name: {
      type: 'string',
      isIn: ['Red', 'Green', 'Blue', 'Orange', 'Grey', 'Ochre', 'Pink', 'Navy', 'Yellow', 'Olive'],
      required: true
    },
    // Associations
    // group association with the 'universe' table
    universeId: {
      model: 'universe',
      required: true
    },
    // group association with the 'user' table
    tutorId: {
      model: 'user'
    },
    // group association with the 'studentsteam' table
    students: {
      collection: 'studentsteam',
      via: 'groupId'
    },
  },
};
