/**
 * QuestionAnswer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  // definition of questionAnswer table attributes
  attributes: {
    // attribute that stores the question answer
    questionAnswer: {
      type: 'number',
      isIn: [-2, -1, 0, 1, 2],
      required: true,
      example: 2
    },
    questionType: {
      type: 'string',
    },
    // attribute that stores the response date
    date: {
      type: 'ref',
      columnType: 'timestamp',
      required: true,
      example: '2023-05-14T10:00:00Z'
    },
    //Associations
    // questionAnswer association with the 'user' table
    userId: {
      model: 'user',
      required: true,
      description: 'Reference to the student who answered the question'
    },
    toUserId: {
      model: 'user',
      description: 'Reference to the student who answered the question'
    },
    // questionAnswer association with the 'question' table
    questionId: {
      model: 'question',
      required: true,
      description: 'Reference to the question that was answered'
    }
  },

  // Custom method to find questions with specific questionType
  calculateProfileByAnswerType: async function (userId, type) {
    // Query that gets the current user answer's filtering by most recent 7.
    const result = await sails.sendNativeQuery(
      `SELECT * FROM "questionanswer"
       WHERE "userId" = $1
       AND (string_to_array("questionType", ',')::text[])[1] = $2
       ORDER BY "createdAt" DESC
       LIMIT 7`,
      [userId, type]
    );
    const answers = result.rows;

    let answer;
    let x = 0;
    let y = 0;
    sails.log.debug(answers);
    // Iterate throught questionAnswer and define the x & y from the definition table.
    for (let i = 0; i < 3; i++) {
      answer = answers[i].questionAnswer;
      if (answer === 1) {
        y--;
        sails.log.debug('Structure');
      } else if (answer === 2) {
        y++;
        sails.log.debug('Ambiguity');
      } else {
        sails.log.debug('Invalid answer to calculate profile');
      }
      sails.log.debug('Current values after processing answer:', { answer, x, y });
    }

    for (let i = 3; i < 7; i++) {
      answer = answers[i].questionAnswer;
      if (answer === 1) {
        if(i === 4) {
          x++;
        }
        x--;
        sails.log.debug('Task/Technical');
      } else if (answer === 2) {
        if(i === 4) {
          x--;
        }
        x++;
        sails.log.debug('People/Social');
      } else {
        sails.log.debug('Invalid answer to calculate profile');
      }
      sails.log.debug('Current values after processing answer:', { answer, x, y });
    }

    sails.log.debug('Final values:', { x, y });

    if (x > 0 && y > 0) {
      return 'conceptual';
    } else if (x > 0 && y <= 0) {
      return 'behavioral';
    } else if (x <= 0 && y > 0) {
      return 'analytical';
    } else {
      return 'directive';
    }
  },
};
