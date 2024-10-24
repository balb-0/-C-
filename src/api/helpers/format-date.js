module.exports = {
  friendlyName: 'Format date',

  description: 'Formata uma data no formato month day year.',

  inputs: {
    date: {
      type: 'string',
      example: 'Mon Apr 25 2005 00:00:00 GMT-0300 (Horário Padrão de Brasília)',
    }
  },

  exits: {
    success: {
      outputFriendlyName: 'Formatted date',
    },
  },

  fn: async function (inputs, exits) {
    // Create a new Date object using the date provided in the inputs
    const date = new Date(inputs.date);

    // Define the options for formatting the date
    const options = { month: 'short', day: 'numeric', year: 'numeric' };

    // Replace any occurrences of ", " in the formatted string with a single space
    const formattedDate = date.toLocaleDateString('en-US', options).replace(/, /g, ' ');

    // Return the formatted date string as the success output
    return exits.success(formattedDate);
}

};
