const supertest = require("supertest");
const assert = require("assert");

describe("AdminController", () => {
  describe("#dashboard", () => {

    before((done) => {
        // arrange
        const userLogin = { emailAddress: "otavio@teste.com", password: "123" };
        agent = supertest.agent(sails.hooks.http.app); supertest.agent /* is used to create cookies between sessions, storaging user info
                                                                          across them */
  
        // act
        agent
          .post("/login")
          .send(userLogin)
          .end((err, res) => {
            if (err) return done(err)
  
        // assert
            assert.strictEqual(res.status, 302) // Assuming 302 is the correct status for successful login
            done()
          })
      })

    it('Show admin dashboard', () => {
        // act
        agent
            .get('/admin')
            .end((err, res) => {
                if (err) return done(err)

        // assert
                assert.strictEqual(res.status, 200)
            })

    })

  })
})