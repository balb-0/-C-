/**
 * Question.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of question table attributes
  attributes: {
    // attribute that stores the question text of the question
    questionText: {
      type: 'string',
      required: true
    },
    // attribute that stores the alternatives of the question
    alternatives: {
      type: 'json',
      required: true
    },
    // attribute that stores the type of the question
    questionType: {
      type: 'json',
      required: true
    },
    // Associations
    // question association with the 'questionanswer' table
    questionAnswers: {
      collection: 'questionanswer',
      via: 'questionId'
    }
  },

  // Custom method to find questions with specific questionType
  findByQuestionType: async function (type) {
    // Use the appropriate query for PostgreSQL to check if the first element of the array matches the specified value
    const result = await sails.sendNativeQuery(
      `SELECT * FROM "question" WHERE "questionType"->>0 = $1`,
      [type]
    );
    return result.rows;
  }

};
