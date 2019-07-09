import { agent, SuperTest, Test } from "supertest";
import { should } from 'chai';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import jsonSchema = require('chai-json-schema');
import {token} from "./scheme/tokenSchema";
import {registrationData} from "./data/registrationData";
import {loginUserData} from "./data/loginUserData";
import {ObjectID} from "bson";
import {jwt} from 'jsonwebtoken'


chai.use(chaiHttp);
chai.use(jsonSchema);

should();

const SERVER_AGENT: SuperTest<Test> = agent(`http://localhost:8090/`);
let email: string;

describe('tests user', () => {
    it('try registration with invalid email data', (done) => {
        SERVER_AGENT.post('user')
            .expect(400)
            .send({email: "ff", user_name: "friend", password: "asfsa11fq"})
            .end((err: Error, res: any) => {
                res.status.should.to.be.eql(400);
                done();
            })
    });

    it('try registration with invalid length of password', (done) => {
        SERVER_AGENT.post('user')
            .expect(400)
            .send({email: "ff@mail.ru", user_name: "friend", password: "1231f"})
            .end((err: Error, res: any) => {
                res.status.should.to.be.eql(400);
                done();
            })
    });

    it('try registration user with email in system', (done) => {
         SERVER_AGENT.post('user')
            .expect(400)
            .send(registrationData)
            .end((err: Error, res: any) => {
                res.status.should.to.be.eql(400);
                done();
            })
    });

    it('succesfully registration', (done) => {
        email = new ObjectID().toHexString() + "@mail.ru";

        SERVER_AGENT.post('user')
            .expect(200)
            .send({email: email, user_name: "yahya", password: "badboy1231"})
            .end((err: Error, res: any) => {
                res.status.should.to.be.eql(200);
                done();
            });
    });

    it('succesfully registration check', (done) => {
        SERVER_AGENT.post('user/login')
            .expect(200)
            .send({email: email, password: "badboy1231"})
            .end((err: Error, res: any) => {
                res.status.should.to.be.eql(200);
                done();
            });
    });

    it('succesfully login test', (done) => {
        SERVER_AGENT.post('user/login')
            .expect(200)
            .send(loginUserData)
            .end((err: Error, res: any) => {
                res.status.should.to.be.eql(200);
                res.body.should.to.be.jsonSchema(token);
                done();
            })
    });

    it('invalid email in sing in', (done) => {
        SERVER_AGENT.post('user/login')
            .expect(400)
            .send({email: "yahya1_1231@mail.ru", user_name: "yahya", password: "badboy1231"
            })
            .end((err: Error, res: any) => {
                res.status.should.to.be.eql(400);
                done();
            })
    });

    it('invalid password in sing in', (done) => {
        SERVER_AGENT.post('user/login')
            .expect(400)
            .send({email: "yahya_1231@mail.ru", user_name: "yahya", password: "badboy123111"
            })
            .end((err: Error, res: any) => {
                res.status.should.to.be.eql(400);
                done();
            })
    });

    it('check \'refresh\' method with invalid data', (done) => {
        SERVER_AGENT.post('user/refresh')
            .expect(400)
            .send({"refreshToken": "1111"
            })
            .end((err: Error, res: any) => {
                res.status.should.to.be.eql(400);
                done();
            })
    });
});
