module.exports = {

  friendlyName: 'Get numbers',

  description: '',

  inputs: {
    string: {
      type: 'string',
      required: true
    }
  },

  exits: {

  },

  fn: async function (inputs) {
    // Extract all sequences of digits from the input string
    const numbers = inputs.string.match(/\d+/g).map(Number);

    // Return the extracted numbers as an array
    return numbers;
  }
};
