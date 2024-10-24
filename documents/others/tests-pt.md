Abaixo estão os códigos de desenvolvimento referentes a cada um dos testes citados no Web Application Document (WAD).

### `HomepageController` Tests

#### 1. Redirect to login if user is not logged in.

**Description**: Checks whether the application redirects to the login page when an unauthenticated user tries to access the home page.<br>
**Status**: Test passed.

**Error Handling**:
- Handles authentication errors.
- Verifies if the redirection to the login page occurs with a 302 status.

**Code**:
```javascript
it('should return bad request for invalid happiness value', function (done) {
  this.timeout(5000); // Increase the timeout here too
  const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

  agent
    .post('/login')
    .send(userLogin)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      assert.strictEqual(res.status, 302); // Ensure redirection to login

      agent
        .post('/happiness-meter')
        .send({ happiness: 6 })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 400); // Check for bad request status
          done();
        });
    });
});
```

#### 2. Display of the overview page if the user is logged in

**Description**: Checks that the overview page is displayed correctly when an authenticated user accesses the home page.<br>
**Status**: Test passed.

**Error Handling**:
- Handles authentication errors.
- Verifies if the overview page loads successfully with a 200 status.

**Code**:
```javascript
it('should update happiness meter if user is logged in', function (done) {
  this.timeout(50000); // Increase the timeout here too
  const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

  agent
    .post('/login')
    .send(userLogin)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      assert.strictEqual(res.status, 302); // Ensure redirection to login

      agent
        .post('/happiness-meter')
        .send({ happiness: 4 })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 200); // Check for successful update
          assert.strictEqual(
            res.body.message,
            'Happiness level updated successfully!'
          ); // Assert message content
          done();
        });
    });
});
```

### `#happinessMeter` Tests

#### 1. Display the overview page if the user is logged in

**Description**: Checks if the overview page is displayed when the user is logged in.<br>
**Status**: Test passed.

**Error Handling**:
- Handles authentication errors.
- Verifies if the overview page loads successfully with a 200 status.

**Code**:
```javascript
it('should display the overview page if user is logged in', function (done) {
  this.timeout(5000); // Increase the timeout here too
  const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

  agent
    .post('/login')
    .send(userLogin)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      assert.strictEqual(res.status, 302); // Ensure redirection to login

      agent.get('/').end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.strictEqual(res.status, 200); // Check for successful page load
        done();
      });
    });
});
```

#### 2. Invalid request returned for invalid happiness value

**Description**: Checks if the application returns a Bad Request (400) error when sending an invalid happiness value.<br>
**Status**: Test passed.

**Error Handling**:
- Handles invalid happiness value errors.
- Verifies if the application returns a 400 error for invalid input.

**Code**:
```javascript
it('should return bad request for invalid happiness value', function (done) {
  this.timeout(5000); // Increase the timeout here too
  const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

  agent
    .post('/login')
    .send(userLogin)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      assert.strictEqual(res.status, 302); // Ensure redirection to login

      agent
        .post('/happiness-meter')
        .send({ happiness: 6 })
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          assert.strictEqual(res.status, 400); // Check for bad request status
          done();
        });
    });
});
```

### `AdminController` Tests

#### 1. Show admin dashboard

**Description**: Checks if the admin dashboard is displayed correctly when accessed by a logged-in user.<br>
**Status**: Test passed.

**Error Handling**:
- Handles authentication errors.
- Verifies if the dashboard loads correctly with a 200 status.

**Code**:
```javascript
const supertest = require("supertest");
const assert = require("assert");

describe("AdminController", () => {
  describe("#dashboard", () => {

    before((done) => {
      // Arrange
      const userLogin = { emailAddress: "otavio@teste.com", password: "123" };
      agent = supertest.agent(sails.hooks.http.app);

      // Act
      agent
        .post("/login")
        .send(userLogin)
        .end((err, res) => {
          if (err) return done(err);

          // Assert
          assert.strictEqual(res.status, 302);
          done();
        });
    });

    it('Show admin dashboard', (done) => {
      // Act
      agent
        .get('/admin')
        .end((err, res) => {
          if (err) return done(err);

          // Assert
          assert.strictEqual(res.status, 200);
          done();
        });
    });
  });
});
```

### `GameController` Tests

#### 1. Get to the Game Creation Page

**Description**: Checks if the game creation page is displayed correctly when accessed by a logged-in user.<br>
**Status**: Test passed.

**Error Handling**:
- Handles authentication errors.
- Verifies if the page loads correctly with a 200 status.

**Code**:
```javascript
const supertest = require("supertest");
const assert = require("assert");

describe("GameController", () => {
  describe("#create", () => {
    let agent;

    before((done) => {
      // Arrange
      const userLogin = { emailAddress: "otavio@teste.com", password: "123" };
      agent = supertest.agent(sails.hooks.http.app);

      // Act
      agent
        .post("/login")
        .send(userLogin)
        .end((err, res) => {
          if (err) return done(err);

          // Assert
          assert.strictEqual(res.status, 302);
          done();
        });
    });

    it("Get to the Game Creation Page", (done) => {
      // Act
      agent
        .get("/game/create")
        .end((err, res) => {
          if (err) return done(err);

          // Assert
          assert.strictEqual(res.status, 200);
          done();
        });
    });

    it ("Create a new game", (done) => {
      // Arrange
      const gameTimestamp = { startDate: new Date('2024-06-08T00:00:00').toISOString(), endDate: new Date('2024-07-25T00:00:00').toISOString() };

      // Act
      agent.post("/game/create").send(gameTimestamp).end((err, res) => {
        if (err) return done(err);

        // Assert
        assert.strictEqual(res.status, 302);
        done();
      });
    });
  });
});
```

### `RoundController` Tests

#### 1. Show Round Creation Page

**Description**: Checks if the round creation page is displayed correctly when accessed by a logged-in user.<br>
**Status**: Test passed.

**Error Handling**:
- Handles authentication errors.
- Verifies if the page loads correctly with a 200 status.

**Code**:
```javascript
const supertest = require("supertest");
const assert = require("assert");

describe("RoundController", () => {
  describe("#create", () => {

    before((done) => {
      // Arrange
      const userLogin = { emailAddress: "otavio@teste.com", password: "123" };
      agent = supertest.agent(sails.hooks.http.app);

      // Act
      agent
        .post("/login")
        .send(userLogin)
        .end((err, res) => {
          if (err) return done(err);

          // Assert
          assert.strictEqual(res.status, 302);
          done();
        });
    });

    it('Show Round Creation Page', (done) => {
      // Act
      agent
        .get('/round/create')
        .end((err, res) => {
          if (err) return done(err);

          // Assert
          assert.strictEqual(res.status, 200);
          done();
        });
    });

    it('Create new round', (done) => {
      // Arrange
      const newRound = { startDate: new Date('2024-06-08T00:00:00').toISOString(), endDate: new Date('2024-06-16T00:00:00').toISOString(), roundNumber: 1, explanation: 'In this round, certain things will be done', gameId: 1 };

      // Act
      agent
        .post('/round/create')
        .send(newRound)
        .end((err, res) => {
          if (err) return done(err);

          // Assert
          assert.strictEqual(res.status, 302);
          done();
        });
    });
  });
});
```

### `UserController` Tests

#### 1. Log in the website as an admin

**Description**: Checks if an admin can log in successfully.<br>
**Status**: Test passed.

**Error Handling**:
- Verifies login redirects with a 302 status.

**Code**:
```javascript
const supertest = require('supertest');
var assert = require('assert');

describe('UserController', () => {
  describe('#login', () => {
    it('Log in the website as an admin', async function () {
      // Arrange
      const userLogin = { emailAddress: 'otavio@teste.com', password: '123' };

      // Act
      const result = await supertest(sails.hooks.http.app).post('/login').send(userLogin);

      // Assert
      assert.strictEqual(result.status, 302);
    });
  });
});
```

### `MessageController` Tests

#### 1. Create a message successfully

**Description**: Verifies if a message is created successfully.<br>
**Status**: Test passed.

**Error Handling**:
- Returns 401 if user is not authenticated.
- Returns 400 if message content is missing.
- Returns 500 for database errors.

**Code**:
```javascript
const controller = require("../../api/controllers/MessageController");
const sinon = require("sinon");
const assert = require("assert");

describe("MessageController", () => {
  let databaseStub;

  afterEach(() => {
    if (databaseStub) {
      databaseStub.restore();
      databaseStub = null;
    }
  });

  describe("create", () => {
    it("Must create a message successfully", async () => {
      databaseStub = sinon.stub(Message, "create").resolves({
        id: 1,
        content: "Test message",
        userId: 1,
        date: new Date(),
      });
      const req = {
        session: { userId: 1 },
        body: { content: "Test message" },
      };

      const res = {
        statusCode: null,
        body: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.body = data;
          this.statusCode = this.statusCode || 200;
        },
      };

      await controller.create(req, res);

      assert.strictEqual(databaseStub.calledOnce, true);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.content, "Test message");
    });

    it("Must return error 401 if user is not authenticated", async () => {
      const req = {
        session: {},
        body: { content: "Test message" },
      };

      const res = {
        statusCode: null,
        body: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.body = data;
        },
      };

      await controller.create(req, res);

      assert.strictEqual(res.statusCode, 401);
      assert.deepStrictEqual(res.body, { error: "User not authenticated" });
    });

    it("Must return error 400 if message content is not provided", async () => {
      const req = {
        session: { userId: 1 },
        body: {},
      };

      const res = {
        statusCode: null,
        body: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
          this.body = data;
        },
      };

      await controller.create(req, res);

      assert.strictEqual(res.statusCode, 400);
      assert.deepStrictEqual(res.body, {
        error: "Message content is required",
      });
    });

    it("Must return error 500 if there is an error creating the message", async () => {
      databaseStub = sinon.stub(Message, "create").throws(new Error("Database error"));
      const req = {
        session: { userId: 1 },
        body: { content: "Test message" },
      };

      const res = {
        statusCode: null,
        body: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        json: function (data) {
```

Em síntese, os testes acima contemplam cerca de 50% dos possíveis testes do produto atual, cobrindo os pontos e funcionalidades mais relevantes do projeto, applicando comportamentos esperados para todas as variações de usuários autênticados e não autênticados.