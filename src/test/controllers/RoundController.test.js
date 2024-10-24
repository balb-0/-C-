const supertest = require("supertest");
const assert = require("assert");

describe("RoundController", () => {
  describe("#create", () => {

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

    it('Show Round Creation Page', () => {
        // act
        agent
          .get('/round/create')
          .end((err, res) => {
              if (err) return done(err)
                
        // assert
              assert.strictEqual(res.status, 200)
          })
    })

    it('Create new round', () => {
      // arrange
      const newRound = { startDate: new Date('2024-06-08T00:00:00').toISOString(), endDate: new Date('2024-06-16T00:00:00').toISOString(), roundNumber: 1, explanation: 'In this round, certain things will be done', gameId: 1 }

      // act
      agent
        .post('/round/create')
        .send(newRound)
        .end((err, res) => {
          if (err) return done(err)
      
      // assert
          assert.strictEqual(res.status, 302)
          done()
        })
    })

  })
})