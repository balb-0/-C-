const supertest = require('supertest');
const assert = require('assert');

describe('GameController', () => {
  describe('#create', () => {
    let agent;

    before((done) => {
      // arrange
      const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };
      agent = supertest.agent(sails.hooks.http.app); supertest.agent; /* is used to create cookies between sessions, storaging user info
                                                                        across them */

      // act
      agent
        .post('/login')
        .send(userLogin)
        .end((err, res) => {
          if (err) { return done(err); }

          // assert
          assert.strictEqual(res.status, 302); // Assuming 302 is the correct status for successful login
          done();
        });
    });

    it('Get to the Game Creation Page', (done) => {
      // act
      agent
        .get('/game/create')
        .end((err, res) => {
          if (err) { return done(err); }

          // assert
          assert.strictEqual(res.status, 200);
          done();
        });
    });

    it('Create a new game', (done) => {
      // arrange
      const gameTimestamp = { startDate: new Date('2070-10-08T00:00:00').toISOString(), endDate: new Date('2070-11-25T00:00:00').toISOString() };

      // act
      const result = agent.post('/game/create').send(gameTimestamp).end((err, res) => {
        if (err) { return done(err); }

        //assert
        assert.strictEqual(res.status, 302);
        done();
      });
    });
  });
});
