// Due to problems during test execution, this file is temporarily not working

// const supertest = require("supertest");
// const assert = require("assert");

// describe("UniverseController", () => {
//   describe("#create", () => {
//     let agent;
//     let gameId;

//     before((done) => {
//       // arrange
//       const userLogin = { emailAddress: "otavio@teste.com", password: "123" };
//       agent = supertest.agent(sails.hooks.http.app); // supertest.agent is used to create cookies between sessions, storing user info across them

//       // act
//       agent
//         .post("/login")
//         .send(userLogin)
//         .end((err, res) => {
//           if (err) return done(err);

//           // assert
//           assert.strictEqual(res.status, 302); // Assuming 302 is the correct status for successful login
//           done();
//         });
//     });

//     it("Create a new game", (done) => {
//       // arrange
//       const newGame = { title: 'My Game', description: 'A new game' };

//       // act
//       agent
//         .post("/game/create")
//         .send(newGame)
//         .end((err, res) => {
//           if (err) return done(err);

//           // assert
//           assert.strictEqual(res.status, 302);
          
//           // Save the gameId from the response if it's returned in a specific way, e.g., res.body.id
//           gameId = res.body.id; // Adjust this according to your actual response structure
//           done();
//         });
//     });

//     it("Show Universe Creation Page", (done) => {
//       // act
//       agent
//         .get("/universe/create")
//         .end((err, res) => {
//           if (err) return done(err);

//           // assert
//           assert.strictEqual(res.status, 200);
//           done();
//         });
//     });

//     it("Create a new universe", (done) => {
//       // arrange
//       const newUniverse = { name: 'red', countryId: 56, gameId: gameId };

//       // act
//       agent
//         .post("/universe/create")
//         .send(newUniverse)
//         .end((err, res) => {
//           if (err) return done(err);

//           // assert
//           assert.strictEqual(res.status, 302);
//           done();
//         });
//     });
//   });
// });