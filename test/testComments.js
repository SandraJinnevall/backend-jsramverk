const   expect      = require('chai').expect
const   server      = require('../server.js')
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);


let id = "";

describe('Testing route for the comment-functionality', () => {
    it('GET: trying to get all comments', (done) => {
        chai.request(server).get('/comments/')
                .then((res) => {
                    expect(res.status).to.equal(200)
                    done()
                })
                .catch((err) => done(err))
    });
    it('POST: creating a comment, expecting 200', (done) => {
        let testComment = {
            color: "blue",
            start: "4",
            end: "6",
            markedText: "ockspd",
            comment: "Felstavning",
            documentID: "123"

        };
        chai.request(server)
            .post("/comments/")
            .send(testComment)
            .end((err, res) => {
                res.should.have.status(200);
                id = res.body.newComments1._id;
                done();
            });
    });
    it('POST: try creating comment with empty values, expecting 500', (done) => {
        let testCommentFail = {
            color: "",
            start: "",
            end: "",
            markedText: "",
            comment: "",
            documentID: ""

        };
        chai.request(server)
            .post("/comments/")
            .send(testCommentFail)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    it('DELETE: trying to delete the comment, expecting 200', (done) => {
        chai.request(server).delete('/comments/'+id)
                .then((res) => {
                    expect(res.status).to.equal(200)
                    done()
                })
                .catch((err) => done(err))
    });

    it('DELETE: trying to delete a comment that doesnt exist, expecting 500', (done) => {
        chai.request(server).delete('/comments/123')
                .then((res) => {
                    expect(res.status).to.equal(500)
                    done()
                })
                .catch((err) => done(err))
    });
});