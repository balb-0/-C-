// api/models/User.js
module.exports = {
  // definition of User table attributes
  attributes: {
    //attribute that stores the user type of the user
    userType: {
      type: 'string',
      required: true,
      isIn: ['student', 'tutor', 'admin'],
    },
    //attribute that stores the full name of the user
    fullName: {
      type: 'string',
      allowNull: true
    },
    //attribute that stores the email address of the user
    emailAddress: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: 'mary.sue@example.com',
    },
    //attribute that stores the password of the user
    password: {
      type: 'string',
      required: true,
      protect: true,
      description:
        'Securely hashed representation of the user\'s login password.',
      example: '2$28a8eabna301089103-13948134nad',
    },
    //attribute that stores the birthday of the user
    birthday: {
      type: 'ref',
      columnType: 'date'
    },
    //attribute that stores the country pov of the user
    countryPov: {
      type: 'string',
      allowNull: true
    },
    //attribute that stores the about me of the user
    aboutMe: {
      type: 'string',
      allowNull: true
    },
    //attribute that stores the profile type of the user
    personalProfileType: {
      type: 'string',
    },
    externalProfileType: {
      type: 'string',
    },
    //attribute that stores the hapinnes of the user
    happinessMeter: {
      type: 'number',
    },
    //attribute that stores the gender of the user
    gender: {
      type: 'string',
      isIn: ['male', 'female', 'other'],
    },
    //attribute that stores the lastSeenAt of the user
    lastSeenAt: {
      type: 'number',
      description: 'A JS timestamp (epoch ms) representing the moment at which this user most recently interacted with the backend while logged in.',
    },
    //attribute that stores the photo of the user
    photo: {
      type: 'string', // URL to the Cloudinary image
    },
    // Associations
    // user association with the 'message' table
    messages: {
      collection: 'message',
      via: 'userId',
    },
    // user association with the 'country' table
    countryId: {
      model: 'country',
    },
    // user association with the 'timezone' table
    timezoneId: {
      model: 'timezone'
    },
    // user association with the 'education' table
    educationId: {
      model: 'education',
    },
    // user association with the 'groups' table
    groups: {
      collection: 'group',
      via: 'tutorId',
    },
    // user association with the 'questionanswer' table
    questionAnswers: {
      collection: 'questionanswer',
      via: 'userId',
    },
    // user association with the 'studentsteam' table
    studentsTeams: {
      collection: 'studentsteam',
      via: 'userId',
    },
  },
  // definition of the primary key
  primaryKey: 'id',
};
