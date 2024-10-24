module.exports = {
  friendlyName: 'Is admin',

  description: 'Check if the current user is an admin and logged in',

  inputs: {
    req: {
      type: 'ref',
      required: true,
      description: 'The request object'
    }
  },

  exits: {
    forbidden: {
      description: 'The user is not an admin'
    },
    redirect: {
      description: 'The user is not logged in and needs to log in'
    }
  },

  fn: async function (inputs, exits) {
    try {
      if (!inputs.req.session.userId) {
        return exits.redirect('/login');
      }

      const user = await User.findOne({ id: inputs.req.session.userId });

      if (!user || user.userType !== 'admin') {
        return exits.forbidden('You do not have permission to perform this action.');
      }

      return exits.success(true);
    } catch (error) {
      return exits.error(error);
    }
  }
};
