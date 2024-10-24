module.exports = {


  friendlyName: 'Time gmt',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    // Obtém a data e hora atual em UTC (GMT)
    let now = new Date();

    // Obtém as partes da data e hora no GMT
    let gmtHours = now.getUTCHours();

    return gmtHours;
  }


};

