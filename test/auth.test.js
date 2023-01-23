const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const server = require("../server");
chai.use(chaiHttp);

describe("User register/login workflow test", () => {
  it("should register (valid user)", (done) => {
    // 1) Register new user
    let user = {
      email: "mail@petersen.com",
      password: "123456",
    };
    chai
      .request(server)
      .post("/auth/register")
      .send(user)
      .end((err, res) => {
        // Asserts
        expect(res.status).to.be.equal(201);
        expect(res.body).to.be.a("object");
        done();
      });
  });
  it("should'nt register (not valid user no email)", (done) => {
    let user = {
      password: "123456",
    };
    chai
      .request(server)
      .post("/auth/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("should'nt register (not valid user no password)", (done) => {
    let user = {
      email: "mail@petersen.com",
    };
    chai
      .request(server)
      .post("/auth/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("should'nt register (not valid email)", (done) => {
    let user = {
      email: "mailetersen.com",
      password: "123456",
    };
    chai
      .request(server)
      .post("/auth/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("should'nt register (duplicate)", (done) => {
    let user = {
      email: "mail@petersen.com",
      password: "123456",
    };
    chai
      .request(server)
      .post("/auth/register")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(409);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("should login", (done) => {
    let user = {
      email: "mail@petersen.com",
      password: "123456",
    };
    chai
      .request(server)
      .post("/auth")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("should'nt login (bad password)", (done) => {
    let user = {
      email: "mail@petersen.com",
      password: "12356",
    };
    chai
      .request(server)
      .post("/auth")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res.body).to.be.a("object");
        done();
      });
  });

  it("should give us a refresh token that works", (done) => {
    let user = {
      email: "admin@ad.min",
      password: "12345",
    };
    chai
      .request(server)
      .post("/auth")
      .send(user)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body.accessToken).to.be.a("string");
        const accessToken = res.body.accessToken;
        const refreshToken = res.headers["set-cookie"]
          .toString()
          .split(";")[0]
          .split("=")[1];

        done();
      });
  });
});
