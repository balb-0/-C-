const supertest = require('supertest');
const assert = require('assert');

describe('HomepageController', () => {
  let agent;

  before(function (done) {
    this.timeout(11000); // Aumentar o timeout aqui
    agent = supertest.agent(sails.hooks.http.app);
    done();
  });

  it('should redirect to login if user is not logged in', function (done) {
    this.timeout(5000); // Aumentar o timeout aqui também
    agent.get('/').end((err, res) => {
      if (err) {
        return done(err);
      }
      assert.strictEqual(res.status, 302);
      assert.strictEqual(res.header.location, '/login');
      done();
    });
  });

  it('should display the overview page if user is logged in', function (done) {
    this.timeout(5000); // Aumentar o timeout aqui também
    const userLogin = { emailAddress: 'vitor@teste.com', password: '123' };

    agent
      .post('/login')
      .send(userLogin)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 302);

        agent.get('/').end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 200);
          done();
        });
      });
  });

  describe('#happinessMeter', () => {
    it('should update happiness meter if user is logged in', function (done) {
      this.timeout(50000); // Aumentar o timeout aqui também
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
            .post('/happiness-meter')
            .send({ happiness: 4 })
            .end((err, res) => {
              if (err) {
                return done(err);
              }
              assert.strictEqual(res.status, 200);
              assert.strictEqual(
                res.body.message,
                'Happiness level updated successfully!'
              );
              done();
            });
        });
    });

    it('should return bad request for invalid happiness value', function (done) {
      this.timeout(5000); // Aumentar o timeout aqui também
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
            .post('/happiness-meter')
            .send({ happiness: 6 })
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
});
