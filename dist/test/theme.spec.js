"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = require("supertest");
const chai_1 = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
require("mocha");
chai.use(chaiHttp);
const expect = chai.expect;
chai_1.should();
const SERVER_AGENT = supertest_1.agent(`http://localhost:8090/`);
describe('tests theme', () => {
    it('should return theme scheme', (done) => {
        SERVER_AGENT.get('theme/1')
            .expect(200)
            .end((err, res) => {
            res.body.should.to.be.eql();
            done();
        });
    });
});
//# sourceMappingURL=theme.spec.js.map