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
          this.statusCode = this.statusCode || 200; // Default to 200 if status code not set
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
      databaseStub = sinon
        .stub(Message, "create")
        .throws(new Error("Database error"));
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
        },
      };

      await controller.create(req, res);

      assert.strictEqual(databaseStub.calledOnce, true);
      assert.strictEqual(res.statusCode, 500);
      assert.deepStrictEqual(res.body, { error: "Error creating message" });
    });
  });

  describe("list", () => {
    it("Must list all messages successfully", async () => {
      databaseStub = sinon.stub(Message, "find").returns({
        populate: sinon.stub().resolves([
          {
            id: 1,
            content: "Test message 1",
            userId: { id: 1, fullName: "User One" },
            date: new Date(),
          },
          {
            id: 2,
            content: "Test message 2",
            userId: { id: 2, fullName: "User Two" },
            date: new Date(),
          },
        ]),
      });

      const req = {};

      const res = {
        statusCode: null,
        viewName: null,
        data: null,
        status: function (code) {
          this.statusCode = code;
          return this;
        },
        view: function (viewName, data) {
          this.viewName = viewName;
          this.data = data;
        },
        json: function (data) {
          this.body = data;
        },
      };

      await controller.list(req, res);

      assert.strictEqual(databaseStub.calledOnce, true);
      assert.strictEqual(res.viewName, "pages/homepage");
      assert.strictEqual(res.data.messages.length, 2);
    });

    it("Must return error 500 if there is an error fetching messages", async () => {
      databaseStub = sinon
        .stub(Message, "find")
        .throws(new Error("Database error"));
      const req = {};

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

      await controller.list(req, res);

      assert.strictEqual(databaseStub.calledOnce, true);
      assert.strictEqual(res.statusCode, 500);
      assert.deepStrictEqual(res.body, { error: "Error fetching messages" });
    });
  });
});
