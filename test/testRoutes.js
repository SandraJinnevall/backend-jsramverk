const   expect      = require('chai').expect
const   setupTestDb  = require('./setup')
const   server      = require('../server.js')
const chai = require('chai');
const chaiHttp = require('chai-http');
// let TestEditorDocuments = require('../models/TestEditorDocument');

chai.should();
chai.use(chaiHttp);

let id = "";

describe('TESTING ROUTES', () => {
    // setupTestDb();
    describe('GET', () => {
        it('GET: trying to get all data', (done) => {
            chai.request(server).get('/api/editorDocument')
                    .then((res) => {
                        console.log(res)
                        expect(res.status).to.equal(200)
                        done()
                    })
                    .catch((err) => done(err))
        });
    });


    describe('POST', () => {
        it('POST: should get 200 creating a document', (done) => {
            let testDoc = {
                documentHeading: "TestDoc",
                documentText: "Test update"
            };
            chai.request(server)
                .post("/api/editorDocument/")
                .send(testDoc)
                .end((err, res) => {
                    res.should.have.status(200);
                    id = res.body.editorDocument1._id;
                    done();
                });
        });
    });

    describe('PUT', () => {
        it('PUT: should get 200 chaning an document', (done) => {
            let updatedoc = {
                documentHeading: "TestDoc!!",
                documentText: "Test update"
            };
            chai.request(server)
                .put("/api/editorDocument/"+id)
                .send(updatedoc)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });


    describe('DELETE', () => {
        it('DELETE: trying to delete data that doesnt exist', (done) => {
            chai.request(server).delete('/api/editorDocument/4949')
                    .then((res) => {
                        expect(res.status).to.equal(500)
                        done()
                    })
                    .catch((err) => done(err))
        });
    });

})