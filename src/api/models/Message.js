/**
 * Message.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of message table attributes
  attributes: {
    // attribute that stores the content of the message
    content: {
      type: 'string',
      required: true,
      description: 'The content of the message',
      example: 'Hello, world!'
    },
    // attribute that stores the message creation date
    date: {
      type: 'ref',
      columnType: 'timestamp',
      required: true,
      description: 'The date the message was created',
      example: '2024-05-14T12:00:00.000Z'
    },
    // Associations
    // message association with the 'user' table
    userId: {
      model: 'user',
      required: true,
      description: 'The ID of the user who created the message'
    },
    groupId: {
      model: 'group',
      required: true,
      description: 'The ID of the group who created the message'
    }
  },
};
