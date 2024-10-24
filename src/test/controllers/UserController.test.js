const supertest = require('supertest');
var assert = require('assert');

describe('UserController', () => {
  describe('#login', () => {
    it('Log in the website as an admin', async () => {
      // arrange
      const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

      // act
      const result = await supertest(sails.hooks.http.app)
        .post('/login')
        .send(userLogin);

      // assert
      assert.strictEqual(result.status, 302);
    });
  });

  describe('#forgotPassword', () => {
    it('Should change user password', async () => {
      // arrange
      const userLogin = {
        emailAddress: 'otavio@teste.com',
        newPassword: '123',
      };

      // test
      const result = await supertest(sails.hook.http.app)
        .post('/forgot-password')
        .send(userLogin);

      // assert
      assert.strictEqual(result.status, 302);
    });
  });
});
