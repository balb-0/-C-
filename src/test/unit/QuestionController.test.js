const request = require('supertest');
const sinon = require('sinon');
const { assert } = require('chai');
const sails = require('sails');

describe('QuestionController', () => {

  describe('personalType', () => {
    let userSession;

    beforeEach(() => {
      userSession = { userId: 1 };
    });

    it('should redirect to login if user is not logged in', (done) => {
      // Arrange
      userSession = {};

      // Act & Assert
      request(sails.hooks.http.app)
        .get('/questions/personal-type')
        .set('Cookie', `sails.sid=${userSession}`)
        .expect(302)
        .expect('Location', '/login', done);
    });

    it('should fetch and render questions on GET request', async () => {
      // Arrange
      const questionStub = sinon.stub(Question, 'findByQuestionType').returns([{ id: 1, question: 'Sample question?' }]);

      // Act
      const res = await request(sails.hooks.http.app)
        .get('/questions/personal-type')
        .set('Cookie', `sails.sid=${userSession}`)
        .expect(200);

      // Assert
      assert.isTrue(questionStub.calledOnce);
      assert.include(res.text, 'Sample question?');

      // Cleanup
      questionStub.restore();
    });

    it('should save answers and redirect on POST request', async () => {
      // Arrange
      const answers = [{ questionId: 1, questionAnswer: '2', questionType: 'decision_making' }];
      const createStub = sinon.stub(QuestionAnswer, 'create').resolves();

      // Act
      const res = await request(sails.hooks.http.app)
        .post('/questions/personal-type')
        .set('Cookie', `sails.sid=${userSession}`)
        .send({ answers })
        .expect(302)
        .expect('Location', '/questions/profile-result');

      // Assert
      assert.isTrue(createStub.calledOnce);

      // Cleanup
      createStub.restore();
    });

    it('should return error for invalid answers format', (done) => {
      // Act & Assert
      request(sails.hooks.http.app)
        .post('/questions/personal-type')
        .set('Cookie', `sails.sid=${userSession}`)
        .send({ answers: 'invalid_format' })
        .expect(400, done);
    });
  });

  describe('externalType', () => {
    let userSession;

    beforeEach(() => {
      userSession = { userId: 1 };
    });

    it('should redirect to login if user is not logged in', (done) => {
      // Arrange
      userSession = {};

      // Act & Assert
      request(sails.hooks.http.app)
        .get('/questions/external-type')
        .set('Cookie', `sails.sid=${userSession}`)
        .expect(302)
        .expect('Location', '/login', done);
    });

    it('should fetch and render questions with group details on GET request', async () => {
      // Arrange
      const userStub = sinon.stub(User, 'findOne').resolves({ id: 1 });
      const studentTeamStub = sinon.stub(StudentsTeam, 'findOne').resolves({ groupId: 1 });
      const groupStub = sinon.stub(StudentsTeam, 'find').resolves([{ userId: { id: 2, name: 'Test User' } }]);
      const questionStub = sinon.stub(Question, 'findByQuestionType').returns([{ id: 1, question: 'Sample question?' }]);

      // Act
      const res = await request(sails.hooks.http.app)
        .get('/questions/external-type')
        .set('Cookie', `sails.sid=${userSession}`)
        .expect(200);

      // Assert
      assert.isTrue(questionStub.calledOnce);
      assert.include(res.text, 'Sample question?');

      // Cleanup
      userStub.restore();
      studentTeamStub.restore();
      groupStub.restore();
      questionStub.restore();
    });

    it('should save answers and redirect on POST request', async () => {
      // Arrange
      const answers = [{ questionId: 1, questionAnswer: '2', questionType: 'collaboration' }];
      const createStub = sinon.stub(QuestionAnswer, 'create').resolves();

      // Act
      const res = await request(sails.hooks.http.app)
        .post('/questions/external-type')
        .set('Cookie', `sails.sid=${userSession}`)
        .send({ answers, toUserId: 2 })
        .expect(302)
        .expect('Location', '/questions/external-type');

      // Assert
      assert.isTrue(createStub.calledOnce);

      // Cleanup
      createStub.restore();
    });

    it('should return error for invalid answers format', (done) => {
      // Act & Assert
      request(sails.hooks.http.app)
        .post('/questions/external-type')
        .set('Cookie', `sails.sid=${userSession}`)
        .send({ answers: 'invalid_format' })
        .expect(400, done);
    });
  });

  describe('profileResult', () => {
    let userSession;

    beforeEach(() => {
      userSession = { userId: 1 };
    });

    it('should redirect to login if user is not logged in', (done) => {
      // Arrange
      userSession = {};

      // Act & Assert
      request(sails.hooks.http.app)
        .get('/questions/profile-result')
        .set('Cookie', `sails.sid=${userSession}`)
        .expect(302)
        .expect('Location', '/login', done);
    });

    it('should fetch profile result and render', async () => {
      // Arrange
      const userStub = sinon.stub(User, 'findOne').resolves({ id: 1 });
      const profileTypeStub = sinon.stub(QuestionAnswer, 'calculateProfileByAnswerType').resolves('Analytical');
      const updateStub = sinon.stub(User, 'updateOne').resolves({ id: 1 });

      // Act
      const res = await request(sails.hooks.http.app)
        .get('/questions/profile-result')
        .set('Cookie', `sails.sid=${userSession}`)
        .expect(200);

      // Assert
      assert.isTrue(userStub.calledOnce);
      assert.isTrue(profileTypeStub.calledOnce);
      assert.include(res.text, 'Analytical');

      // Cleanup
      userStub.restore();
      profileTypeStub.restore();
      updateStub.restore();
    });
  });
});
