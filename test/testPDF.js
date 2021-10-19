const   expect      = require('chai').expect
const   server      = require('../server.js')
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);


describe('Testing route for PDF-functionality', () => {
    it('POST: catch statuscode 500 because there isnt passed any string to convert to pdf', (done) => {
        chai.request(server).post('/generatePDF/')
                .send({ documentText: '' })
                .then((res) => {
                    expect(res.status).to.equal(500)
                    done()
                })
                .catch((error) => {
                    done(error)
                })
    });
    it('POST: expecting statuscode 200, html-string is passed', (done) => {
        chai.request(server).post('/generatePDF/')
                .send({ documentText: '<p>hej</p>' })
                .then((res) => {
                    expect(res.status).to.equal(200)
                    done()
                })
                .catch((err) => done(err))
    });
    it('POST: expecting statuscode 200, string is passed', (done) => {
        chai.request(server).post('/generatePDF/')
                .send({ documentText: 'hej' })
                .then((res) => {
                    expect(res.status).to.equal(200)
                    done()
                })
                .catch((err) => done(err))
    });
    it('POST: expecting statuscode 500, no string is passed', (done) => {
        chai.request(server).post('/generatePDF/')
                .send({ documentText: [] })
                .then((res) => {
                    expect(res.status).to.equal(500)
                    done()
                })
                .catch((err) => done(err))
    });
});