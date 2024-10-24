/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const GroupController = require('../api/controllers/GroupController');
const HomepageController = require('../api/controllers/HomepageController');
const UserController = require('../api/controllers/UserController');

module.exports.routes = {
  // Views
  'GET /login': { view: 'pages/entrance/login' },
  'GET /signup': 'UserController.signup',
  'GET /signup2': { view: 'pages/user/signup2' },
  'GET /forgot-password': { view: 'pages/entrance/forgot-password' },
  'GET /batman': { view: 'pages/user/batman' },

  // Home page
  '/': 'HomepageController.overview',
  'POST /happiness-meter': 'HomepageController.happinessMeter',

  // USER endpoints
  'GET /me/edit': 'UserController.editCurrentUser',
  'POST /updateUser': 'UserController.updateUser',
  'POST /signup': 'UserController.signup',
  'POST /login': 'UserController.login',
  'GET /me': 'UserController.getCurrentUser',
  '/logout': 'UserController.logout',
  'POST /user/update-photo': 'UserController.updatePhoto',
  'POST /forgot-password': 'UserController.forgotPassword',

  // Admin routes
  'GET /admin': 'AdminController.dashboard',

  // Game routes
  'GET /game/create': 'GameController.create',
  'POST /game/create': 'GameController.create',
  'GET /game/': 'GameController.show',

  // Universe routes
  'POST /universe/create': 'UniverseController.create',
  'GET /universe/:id': 'UniverseController.show', // Show view for universe

  // Group routes
  'GET /group/create': 'GroupController.create',
  'POST /group/create': 'GroupController.create',
  'GET /group/create/findUserByEmail': 'GroupController.findUserByEmail',
  'GET /group': 'GroupController.show', // Show view for group

  // Group edit admin
  'GET /group/:id': 'GroupController.showAdmin',
  'POST /group/:id/addStudent': 'GroupController.addStudent',
  'POST /group/:id/removeStudent': 'GroupController.removeStudent',
  'POST /group/:id/update': 'GroupController.update',

  // Message routes
  'POST /me/message': 'MessageController.create',

  // Feedback routes
  'GET /feedback': 'FeedbackController.create',
  'POST /feedback': 'FeedbackController.create',

  // Question routes
  'GET /questions/personal-type': 'QuestionController.personalType',
  'POST /questions/binary_choice': 'QuestionController.personalType',
  'GET /questions/external-type': 'QuestionController.externalType',
  'POST /questions/radio_choice': 'QuestionController.externalType',
  'GET /questions/profile-result': 'QuestionController.profileResult',

  // profile routes
  'GET /profile/:id': 'GroupController.externalProfile',
};
