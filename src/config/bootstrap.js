/* /*  /**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https:sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  //By convention, this is a good place to set up fake data during development.
  //--------------Users Seed------------
  try {
    const timezones = [
      { name: '-12 GMT Baker Island Time (BIT)' },
      { name: '-11 GMT Samoa Standard Time (SST)' },
      { name: '-10 GMT Hawaii-Aleutian Standard Time (HST)' },
      { name: '-10 GMT Tahiti Time (TAHT)' },
      { name: '-9 GMT Alaska Standard Time (AKST)' },
      { name: '-9 GMT Gambier Islands Time (GAMT)' },
      { name: '-8 GMT Pacific Standard Time (PST)' },
      { name: '-8 GMT Pitcairn Islands Time (PST)' },
      { name: '-7 GMT Mountain Standard Time (MST)' },
      { name: '-7 GMT Mexico Pacific Standard Time (MST)' },
      { name: '-6 GMT Central Standard Time (CST)' },
      { name: '-6 GMT Easter Island Time (EAST)' },
      { name: '-5 GMT Eastern Standard Time (EST)' },
      { name: '-5 GMT Colombia Time (COT)' },
      { name: '-4 GMT Venezuela Time (VET)' },
      { name: '-4 GMT Atlantic Standard Time (AST)' },
      { name: '-4 GMT Bolivia Time (BOT)' },
      { name: '-3 GMT Argentina Time (ART)' },
      { name: '-3 GMT French Guiana Time (GFT)' },
      { name: '-3 GMT Brasilia Time (BRT)' },
      { name: '-2 GMT South Georgia Time (GST)' },
      { name: '-1 GMT Azores Standard Time (AZOT)' },
      { name: '-1 GMT Cape Verde Time (CVT)' },
      { name: '+0 GMT Greenwich Mean Time (GMT)' },
      { name: '+1 GMT West Africa Time (WAT)' },
      { name: '+1 GMT Central European Time (CET)' },
      { name: '+2 GMT South Africa Standard Time (SAST)' },
      { name: '+2 GMT Eastern European Time (EET)' },
      { name: '+3 GMT Moscow Standard Time (MSK)' },
      { name: '+3 GMT East Africa Time (EAT)' },
      { name: '+3 GMT Iran Standard Time (IRST)' },
      { name: '+4 GMT Gulf Standard Time (GST)' },
      { name: '+4 GMT Afghanistan Time (AFT)' },
      { name: '+5 GMT Pakistan Standard Time (PKT)' },
      { name: '+5 GMT Indian Standard Time (IST)' },
      { name: '+5 GMT Nepal Time (NPT)' },
      { name: '+6 GMT Bangladesh Standard Time (BST)' },
      { name: '+6 GMT Myanmar Time (MMT)' },
      { name: '+7 GMT Indochina Time (ICT)' },
      { name: '+8 GMT China Standard Time (CST)' },
      { name: '+8 GMT Philippine Time (PHT)' },
      { name: '+8 GMT North Korea Time (KST)' },
      { name: '+9 GMT Japan Standard Time (JST)' },
      { name: '+9 GMT Korea Standard Time (KST)' },
      { name: '+9 GMT Australian Central Standard Time (ACST)' },
      { name: '+10 GMT Australian Eastern Standard Time (AEST)' },
      { name: '+10 GMT Papua New Guinea Time (PGT)' },
      { name: '+11 GMT Solomon Islands Time (SBT)' },
      { name: '+11 GMT Norfolk Island Time (NFT)' },
      { name: '+12 GMT New Zealand Standard Time (NZST)' },
      { name: '+12 GMT Fiji Time (FJT)' },
      { name: '+13 GMT Tonga Time (TOT)' },
      { name: '+14 GMT Line Islands Time (LINT)' },
    ];

    let timezonesCreated = [];
    for (const timezone of timezones) {
      const createdTimezone = await Timezone.findOrCreate(
        { name: timezone.name },
        timezone
      );
      timezonesCreated.push(createdTimezone);
    }

    //-------- Signup first questionaire -----------------
    const questionsProfileType = [
      {
        questionText: 'They like to take the initiative and lead projects.',
        alternatives: ['Disagree', 'Partially disagree', 'Neutral', 'Partially agree', 'Agree'],
        questionType: ['collaboration', 'director', 'radio_choice']
      },

      {
        questionText: 'They feel comfortable expressing their opinions and initiating discussions.',
        alternatives: ['Disagree', 'Partially disagree', 'Neutral', 'Partially agree', 'Agree'],
        questionType: ['collaboration', 'director', 'radio_choice']
      },

      {
        questionText: 'They prefer to follow accepted rules and procedures to avoid conflicts.',
        alternatives: ['Disagree', 'Partially disagree', 'Neutral', 'Partially agree', 'Agree'],
        questionType: ['collaboration', 'conformist', 'radio_choice']
      },

      {
        questionText: 'They avoid conflicts and prefer to work in a harmonious environment.',
        alternatives: ['Disagree', 'Partially disagree', 'Neutral', 'Partially agree', 'Agree'],
        questionType: ['collaboration', 'conformist', 'radio_choice'],
      },

      {
        questionText: 'They value genuine cooperation and are always available to help others.',
        alternatives: ['Disagree', 'Partially disagree', 'Neutral', 'Partially agree', 'Agree'],
        questionType: ['collaboration', 'harmonizer', 'radio_choice'],
      },

      {
        questionText: 'They strive to maintain a positive and encouraging work environment.',
        alternatives: ['Disagree', 'Partially disagree', 'Neutral', 'Partially agree', 'Agree'],
        questionType: ['collaboration', 'harmonizer', 'radio_choice'],
      },

      {
        questionText: 'They like to explore new ideas and think outside the box.',
        alternatives: ['Disagree', 'Partially disagree', 'Neutral', 'Partially agree', 'Agree'],
        questionType: ['collaboration', 'initiator', 'radio_choice'],
      },

      {
        questionText: 'They are motivated by novelties and inventions.',
        alternatives: ['Disagree', 'Partially disagree', 'Neutral', 'Partially agree', 'Agree'],
        questionType: ['collaboration', 'initiator', 'radio_choice'],
      },

      {
        questionText: 'They prefer to analyze complex problems and make decisions based on data.',
        alternatives: ['Disagree', 'Partially disagree', 'Neutral', 'Partially agree', 'Agree'],
        questionType: ['collaboration', 'analyst', 'radio_choice'],
      },

      {
        questionText: 'They like to work linearly, finishing one task before starting another.',
        alternatives: ['Disagree', 'Partially disagree', 'Neutral', 'Partially agree', 'Agree'],
        questionType: ['collaboration', 'analyst', 'radio_choice'],
      },

      {
        questionText: 'When working on projects I :',
        alternatives: ['Like tasks that are clear and have defined outcomes', 'Am comfortable when task and outcomes are not well defined'],
        questionType: ['decision_making', 'analyst', 'binary_choice'],
      },

      {
        questionText: ' If there are major changes during a project I :',
        alternatives: ['Tend to be annoyed because I like to stick to the original work.', 'Easily adapt the work plan to the changes.'],
        questionType: ['decision_making', 'analyst', 'binary_choice'],
      },

      {
        questionText: 'When it comes to planning I rather :',
        alternatives: ['Make decisions quickly without knowing the outcomes exactly.', 'Prepare a few options and think through them before I decide.'],
        questionType: ['decision_making', 'analyst', 'binary_choice'],
      },

      {
        questionText: 'In projects I am more a person who :',
        alternatives: ['Relies on facts and researched data for analyzing the problem and proposing solutions.', 'Sees the underlying problem as well as potential solutions, which might not be visible for others.'],
        questionType: ['decision_making', 'analyst', 'binary_choice'],
      },

      {
        questionText: 'Between two options, choose one that describes you the best.',
        alternatives: ['I value the relations within my team and try to make each member feel included and important. I appreciate their opinion and seek their approval before making a final decision. My big motivation is to maintain harmony.', 'I value co-workers that have a sense of purpose and can speak and act concretely. I prefer to take action, rather than dreaming of impossible opportunities. I prefer to rely on rules in order to move forward. I am motivated by the results my decisions will bring.'],
        questionType: ['decision_making', 'analyst', 'binary_choice'],
      },

      {
        questionText: 'You are a team leader and have a worker that is showing poor results, which normally would lead to dismissal of this worker. However, you are also aware that his life circumstances has changed drastically, which causes stress. And might explain his poor performance. Because he/she does not deliver the expected results, other workers do his/her job and become unsatisfied with extra workload. You already tried talking to him/her, but situation hasn`t changed much. What would be you action plan?',
        alternatives: ['I understand that everyone can encounter problems, but I also have responsibilities as a leader to deliver results and care for the whole team, so I will have to replace this person.', 'I will do my best to make things work out for both sides. The worker will stay employed, I accept lesser performance,  I will see if I can adjust the work and will discuss with other workers why they might have to help the worker.'],
        questionType: ['decision_making', 'analyst', 'binary_choice'],
      },

      {
        questionText: 'Please read the following situation and choose the solution that fit you best: You have been unemployed for the last year and finally you got a good offer from a company, however recently there was an investigation about them using an underpaid workforce to manufacture their goods. It is not a big scandal, but around 30 people has left the place since. Majority of the companies are doing the same in this business. What would be your action plan?',
        alternatives: ['Because I need a job, I will accept the offer. After all, I can not change the whole system just by refusing this offer.', 'I will turn down the offer as I do not want to be working for a company under this investigation. I must make a stand for the underpaid workforce, even if I need a job.'],
        questionType: ['decision_making', 'analyst', 'binary_choice'],
      },

    ];

    for (const question of questionsProfileType) {
      const existingQuestion = await Question.findOne({
        questionText: question.questionText,
      });
      if (!existingQuestion) {
        await Question.create({
          questionText: question.questionText,
          alternatives: question.alternatives,
          questionType: question.questionType,
        });
      }
    }

  //   //-------------- user seeds below -------------------
    const users = [
      {
        userType: 'tutor',
        emailAddress: 'lucca@teste.com',
        fullName: 'Lucca H.P',
        password: '123',
        countryPov: 'South Korea is cool!',
        aboutMe: 'I like to watch movies in my spare time',
        gender: 'male',
        timezoneId: timezonesCreated[44].id,
        countryId: 160,
        birthday: '2006-05-24'
      },
      {
        userType: 'admin',
        emailAddress: 'otavio@teste.com',
        fullName: 'Otavio Vasconcelos',
        password: '123',
        countryPov: 'Brazil is really friendly and warm',
        aboutMe: 'I like cookies.',
        gender: 'male',
        timezoneId: timezonesCreated[20].id,
        countryId: 24,
        birthday: '2004-01-15'
      },
      {
        userType: 'admin',
        emailAddress: 'raphael@teste.com',
        fullName: 'Raphael',
        password: '123',
        countryPov: 'Meu pais é bom',
        aboutMe: 'Sou maioral do VScode',
        gender: 'other',
        timezoneId: timezonesCreated[20].id,
        countryId: 24,
        birthday: '2004-01-15'
      },
      {
        userType: 'student',
        emailAddress: 'joao@teste.com',
        fullName: 'Joao',
        password: '123',
        countryPov: 'Vamo brasa!',
        aboutMe: 'Sou o pica das prog',
        gender: 'other',
        timezoneId: timezonesCreated[20].id,
        countryId: 24,
        birthday: '2004-01-15'
      },
      {
        userType: 'student',
        emailAddress: 'rafa@teste.com',
        fullName: 'Raphael',
        password: '123',
        countryPov: 'Nao gosto do brasa',
        aboutMe: 'Sou foda',
        gender: 'male',
        timezoneId: timezonesCreated[20].id,
        countryId: 24,
        birthday: '2004-01-15'
      },
      {
        userType: 'student',
        emailAddress: 'felipe@teste.com',
        fullName: 'Felipe',
        password: '123',
        countryPov: 'Netherlands',
        aboutMe: 'I like to play video games in my spare time',
        gender: 'other',
        timezoneId: timezonesCreated[28].id,
        countryId: 120,
        birthday: '2004-01-15'
      },
      {
        userType: 'student',
        emailAddress: 'vitor@teste.com',
        fullName: 'Vitor',
        password: '123',
        countryPov: 'Iceland is cool!',
        aboutMe: 'I like front-end programming',
        gender: 'male',
        timezoneId: timezonesCreated[24].id,
        countryId: 74,
        birthday: '2002-01-07'
      },
    ];

    for (const user of users) {
      const existingUser = await User.findOne({
        emailAddress: user.emailAddress,
      });
      if (!existingUser) {
        await User.create({
          fullName: user.fullName,
          emailAddress: user.emailAddress,
          password: await sails.helpers.hashPassword(user.password),
          userType: user.userType,
          countryPov: user.countryPov,
          aboutMe: user.aboutMe,
          gender: user.gender,
          photo: '',
          timezoneId: user.timezoneId,
          countryId: user.countryId,
          birthday: user.birthday
        });
      }
    }

    sails.log.info('Bootstrap completed successfully.');
  } catch (error) {
    sails.log.error('Error during bootstrap:', error);
    throw error;
  }

  // // //-------------- countries -------------------
  try {
    const countries = [
      { name: 'Afghanistan' },
      { name: 'Albania' },
      { name: 'Algeria' },
      { name: 'Andorra' },
      { name: 'Angola' },
      { name: 'Antigua and Barbuda' },
      { name: 'Argentina' },
      { name: 'Armenia' },
      { name: 'Australia' },
      { name: 'Austria' },
      { name: 'Azerbaijan' },
      { name: 'Bahamas' },
      { name: 'Bahrain' },
      { name: 'Bangladesh' },
      { name: 'Barbados' },
      { name: 'Belarus' },
      { name: 'Belgium' },
      { name: 'Belize' },
      { name: 'Benin' },
      { name: 'Bhutan' },
      { name: 'Bolivia' },
      { name: 'Bosnia and Herzegovina' },
      { name: 'Botswana' },
      { name: 'Brazil' },
      { name: 'Brunei' },
      { name: 'Bulgaria' },
      { name: 'Burkina Faso' },
      { name: 'Burundi' },
      { name: 'Cabo Verde' },
      { name: 'Cambodia' },
      { name: 'Cameroon' },
      { name: 'Canada' },
      { name: 'Central African Republic' },
      { name: 'Chad' },
      { name: 'Chile' },
      { name: 'China' },
      { name: 'Colombia' },
      { name: 'Comoros' },
      { name: 'Congo (Congo-Brazzaville)' },
      { name: 'Costa Rica' },
      { name: 'Croatia' },
      { name: 'Cuba' },
      { name: 'Cyprus' },
      { name: 'Czechia (Czech Republic)' },
      { name: 'Denmark' },
      { name: 'Djibouti' },
      { name: 'Dominica' },
      { name: 'Dominican Republic' },
      { name: 'Ecuador' },
      { name: 'Egypt' },
      { name: 'El Salvador' },
      { name: 'Equatorial Guinea' },
      { name: 'Eritrea' },
      { name: 'Estonia' },
      { name: 'Eswatini' },
      { name: 'Ethiopia' },
      { name: 'Fiji' },
      { name: 'Finland' },
      { name: 'France' },
      { name: 'Gabon' },
      { name: 'Gambia' },
      { name: 'Georgia' },
      { name: 'Germany' },
      { name: 'Ghana' },
      { name: 'Greece' },
      { name: 'Grenada' },
      { name: 'Guatemala' },
      { name: 'Guinea' },
      { name: 'Guinea-Bissau' },
      { name: 'Guyana' },
      { name: 'Haiti' },
      { name: 'Honduras' },
      { name: 'Hungary' },
      { name: 'Iceland' },
      { name: 'India' },
      { name: 'Indonesia' },
      { name: 'Iran' },
      { name: 'Iraq' },
      { name: 'Ireland' },
      { name: 'Israel' },
      { name: 'Italy' },
      { name: 'Jamaica' },
      { name: 'Japan' },
      { name: 'Jordan' },
      { name: 'Kazakhstan' },
      { name: 'Kenya' },
      { name: 'Kiribati' },
      { name: 'Kuwait' },
      { name: 'Kyrgyzstan' },
      { name: 'Laos' },
      { name: 'Latvia' },
      { name: 'Lebanon' },
      { name: 'Lesotho' },
      { name: 'Liberia' },
      { name: 'Libya' },
      { name: 'Liechtenstein' },
      { name: 'Lithuania' },
      { name: 'Luxembourg' },
      { name: 'Madagascar' },
      { name: 'Malawi' },
      { name: 'Malaysia' },
      { name: 'Maldives' },
      { name: 'Mali' },
      { name: 'Malta' },
      { name: 'Marshall Islands' },
      { name: 'Mauritania' },
      { name: 'Mauritius' },
      { name: 'Mexico' },
      { name: 'Micronesia' },
      { name: 'Moldova' },
      { name: 'Monaco' },
      { name: 'Mongolia' },
      { name: 'Montenegro' },
      { name: 'Morocco' },
      { name: 'Mozambique' },
      { name: 'Myanmar (formerly Burma)' },
      { name: 'Namibia' },
      { name: 'Nauru' },
      { name: 'Nepal' },
      { name: 'Netherlands' },
      { name: 'New Zealand' },
      { name: 'Nicaragua' },
      { name: 'Niger' },
      { name: 'Nigeria' },
      { name: 'North Korea' },
      { name: 'North Macedonia (formerly Macedonia)' },
      { name: 'Norway' },
      { name: 'Oman' },
      { name: 'Pakistan' },
      { name: 'Palau' },
      { name: 'Palestine State' },
      { name: 'Panama' },
      { name: 'Papua New Guinea' },
      { name: 'Paraguay' },
      { name: 'Peru' },
      { name: 'Philippines' },
      { name: 'Poland' },
      { name: 'Portugal' },
      { name: 'Qatar' },
      { name: 'Romania' },
      { name: 'Russia' },
      { name: 'Rwanda' },
      { name: 'Saint Kitts and Nevis' },
      { name: 'Saint Lucia' },
      { name: 'Saint Vincent and the Grenadines' },
      { name: 'Samoa' },
      { name: 'San Marino' },
      { name: 'Sao Tome and Principe' },
      { name: 'Saudi Arabia' },
      { name: 'Senegal' },
      { name: 'Serbia' },
      { name: 'Seychelles' },
      { name: 'Sierra Leone' },
      { name: 'Singapore' },
      { name: 'Slovakia' },
      { name: 'Slovenia' },
      { name: 'Solomon Islands' },
      { name: 'Somalia' },
      { name: 'South Africa' },
      { name: 'South Korea' },
      { name: 'South Sudan' },
      { name: 'Spain' },
      { name: 'Sri Lanka' },
      { name: 'Sudan' },
      { name: 'Suriname' },
      { name: 'Sweden' },
      { name: 'Switzerland' },
      { name: 'Syria' },
      { name: 'Taiwan' },
      { name: 'Tajikistan' },
      { name: 'Tanzania' },
      { name: 'Thailand' },
      { name: 'Timor-Leste' },
      { name: 'Togo' },
      { name: 'Tonga' },
      { name: 'Trinidad and Tobago' },
      { name: 'Tunisia' },
      { name: 'Turkey' },
      { name: 'Turkmenistan' },
      { name: 'Tuvalu' },
      { name: 'Uganda' },
      { name: 'Ukraine' },
      { name: 'United Arab Emirates' },
      { name: 'United Kingdom' },
      { name: 'United States of America' },
      { name: 'Uruguay' },
      { name: 'Uzbekistan' },
      { name: 'Vanuatu' },
      { name: 'Vatican City' },
      { name: 'Venezuela' },
      { name: 'Vietnam' },
      { name: 'Yemen' },
      { name: 'Zambia' },
      { name: 'Zimbabwe' },
    ];

    let countriesCreated = [];
    for (const country of countries) {
      const createdCountry = await Country.findOrCreate(
        { name: country.name },
        country
      );
      countriesCreated.push(createdCountry);
    }
  } catch (error) {
    console.error(error);
  }
};
