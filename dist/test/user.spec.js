"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = require("supertest");
const chai_1 = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const jsonSchema = require("chai-json-schema");
const tokenSchema_1 = require("./scheme/tokenSchema");
const registrationData_1 = require("./data/registrationData");
const loginUserData_1 = require("./data/loginUserData");
const bson_1 = require("bson");
const jsonwebtoken_1 = require("jsonwebtoken");
chai.use(chaiHttp);
chai.use(jsonSchema);
chai_1.should();
const SERVER_AGENT = supertest_1.agent(`http://localhost:8090/`);
let email;
describe('tests user', () => {
    it('try registration with invalid email data', (done) => {
        SERVER_AGENT.post('user')
            .expect(400)
            .send({ email: "ff", user_name: "friend", password: "asfsa11fq" })
            .end((err, res) => {
            res.status.should.to.be.eql(400);
            done();
        });
    });
    it('try registration with invalid length of password', (done) => {
        SERVER_AGENT.post('user')
            .expect(400)
            .send({ email: "ff@mail.ru", user_name: "friend", password: "1231f" })
            .end((err, res) => {
            res.status.should.to.be.eql(400);
            done();
        });
    });
    it('try registration user with email in system', (done) => {
        SERVER_AGENT.post('user')
            .expect(400)
            .send(registrationData_1.registrationData)
            .end((err, res) => {
            res.status.should.to.be.eql(400);
            done();
        });
    });
    it('succesfully registration', (done) => {
        email = new bson_1.ObjectID().toHexString() + "@mail.ru";
        SERVER_AGENT.post('user')
            .expect(200)
            .send({ email: email, user_name: "yahya", password: "badboy1231" })
            .end((err, res) => {
            res.status.should.to.be.eql(200);
            done();
        });
    });
    it('succesfully registration check', (done) => {
        SERVER_AGENT.post('user/login')
            .expect(200)
            .send({ email: email, password: "badboy1231" })
            .end((err, res) => {
            res.status.should.to.be.eql(200);
            done();
        });
    });
    it('succesfully login test', (done) => {
        SERVER_AGENT.post('user/login')
            .expect(200)
            .send(loginUserData_1.loginUserData)
            .end((err, res) => {
            res.status.should.to.be.eql(200);
            res.body.should.to.be.jsonSchema(tokenSchema_1.token);
            done();
        });
    });
    it('invalid email in sing in', (done) => {
        SERVER_AGENT.post('user/login')
            .expect(400)
            .send({ email: "yahya1_1231@mail.ru", user_name: "yahya", password: "badboy1231"
        })
            .end((err, res) => {
            res.status.should.to.be.eql(400);
            done();
        });
    });
    it('invalid password in sing in', (done) => {
        SERVER_AGENT.post('user/login')
            .expect(400)
            .send({ email: "yahya_1231@mail.ru", user_name: "yahya", password: "badboy123111"
        })
            .end((err, res) => {
            res.status.should.to.be.eql(400);
            done();
        });
    });
    it('check \'refresh\' method with invalid data', (done) => {
        SERVER_AGENT.post('user/refresh')
            .expect(400)
            .send({ "refreshToken": "1111"
        })
            .end((err, res) => {
            res.status.should.to.be.eql(400);
            done();
        });
    });
    it('check \'refresh\' method with valid data', (done) => {
        let refreshToken;
        SERVER_AGENT.post('user/login')
            .expect(200)
            .send(loginUserData_1.loginUserData)
            .end((err, res) => {
            res.status.should.to.be.eql(200);
            let object = res.body.refreshToken;
            object = jsonwebtoken_1.jwt.verify(object, 'you do not know secret');
            refreshToken = object.refreshToken;
        });
        SERVER_AGENT.post('user/refresh')
            .expect(200)
            .send({ "refreshToken": refreshToken
        })
            .end((err, res) => {
            res.status.should.to.be.jsonSchema(tokenSchema_1.token);
            done();
        });
    });
});
//# sourceMappingURL=user.spec.js.map