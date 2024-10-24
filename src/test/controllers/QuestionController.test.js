const supertest = require('supertest');
const assert = require('assert');

describe('QuestionController', () => {
  let agent;

  before(function (done) {
    this.timeout(11000); // Increase the timeout here
    agent = supertest.agent(sails.hooks.http.app);
    done();
  });

  describe('GET /questions/personal-type', () => {
    it('should redirect to login if user is not logged in', function (done) {
      this.timeout(5000); // Increase the timeout here as well
      agent.get('/questions/personal-type').end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 302);
        assert.strictEqual(res.header.location, '/login');
        done();
      });
    });

    it('should display the personal-type questions if user is logged in', function (done) {
      this.timeout(5000); // Increase the timeout here as well
      const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

      agent
        .post('/login')
        .send(userLogin)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 302);

          agent.get('/questions/personal-type').end((err, res) => {
            if (err) {
              return done(err);
            }
            assert.strictEqual(res.status, 200);
            done();
          });
        });
    });
  });

  describe('POST /questions/binary_choice', () => {
    it('should save answers and redirect to profile result', function (done) {
      this.timeout(5000); // Increase the timeout here as well
      const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

      agent
        .post('/login')
        .send(userLogin)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 302);

          const answers = [
            { questionId: 11, questionAnswer: 1, questionType: 'decision_making', userId: 2 },
            { questionId: 12, questionAnswer: 1, questionType: 'decision_making', userId: 2 },
            { questionId: 13, questionAnswer: 1, questionType: 'decision_making', userId: 2 },
            { questionId: 14, questionAnswer: 1, questionType: 'decision_making', userId: 2 },
            { questionId: 15, questionAnswer: 1, questionType: 'decision_making', userId: 2 },
            { questionId: 16, questionAnswer: 1, questionType: 'decision_making', userId: 2 },
            { questionId: 17, questionAnswer: 1, questionType: 'decision_making', userId: 2 },
            { questionId: 18, questionAnswer: 2, questionType: 'decision_making', userId: 2 }
          ];

          agent
            .post('/questions/binary_choice')
            .send({ answers })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              assert.strictEqual(res.status, 302);
              assert.strictEqual(res.header.location, '/questions/profile-result');
              done();
            });
        });
    });

    it('should return bad request for invalid answers format', function (done) {
      this.timeout(5000); // Increase the timeout here as well
      const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

      agent
        .post('/login')
        .send(userLogin)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 302);

          agent
            .post('/questions/binary_choice')
            .send({ answers: 'invalid_format' })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              assert.strictEqual(res.status, 400);
              done();
            });
        });
    });
  });

  describe('GET /questions/external-type', () => {
    it('should redirect /me if user is logged in', function (done) {
      this.timeout(5000); // Increase the timeout here as well
      agent.get('/questions/external-type').end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 302);
        assert.strictEqual(res.header.location, '/me');
        done();
      });
    });

    it('should display the external-type questions if user is logged in', function (done) {
      this.timeout(5000); // Increase the timeout here as well
      const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

      agent
        .post('/login')
        .send(userLogin)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 302);

          agent.get('/questions/external-type').end((err, res) => {
            if (err) {
              return done(err);
            }
            assert.strictEqual(res.status, 302);
            done();
          });
        });
    });
  });

  describe('POST /questions/radio_choice', () => {
    it('should save answers and redirect to external-type questions', function (done) {
      this.timeout(5000); // Increase the timeout here as well
      const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

      agent
        .post('/login')
        .send(userLogin)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 302);

          const answers = [
            { questionId: 1, questionAnswer: 2, questionType: 'collaboration', userId: 2, toUserId: 3 },
            { questionId: 2, questionAnswer: 1, questionType: 'collaboration', userId: 2, toUserId: 3 }
          ];
          const toUserId = 5;

          agent
            .post('/questions/radio_choice')
            .send({ answers, toUserId })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              assert.strictEqual(res.status, 302);
              assert.strictEqual(res.header.location, '/me');
              done();
            });
        });
    });

    it('should return bad request for invalid answers format', function (done) {
      this.timeout(5000); // Increase the timeout here as well
      const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

      agent
        .post('/login')
        .send(userLogin)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 302);

          agent
            .post('/questions/radio_choice')
            .send({ answers: 'invalid_format' })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              assert.strictEqual(res.status, 302);
              done();
            });
        });
    });
  });
});
