const mongooseConnect = require('../db/database');
const mongoose = require('mongoose');
const { after, before, beforeEach } = require('mocha');

let setupTestDb = () => {
    before ((done)=>{
        mongooseConnect.connectdb()
            console.log("OPEN")
            .once('open', () => done())
            .on('error', (error) => console.warn('Error : ',error))
    })

    beforeEach((done)=>{
        mongoose.connection.db.listCollections({name: "testeditordocuments"})
            .next((error,collection)=>{
                if(collection){
                    mongoose.connection.db.dropCollection("testeditordocuments")
                    .then(() => done())
                    .catch((err) => done(err))
                }
                else{
                    done(error)
                }
            })
        
        
    })

    after ((done)=>{
        mongooseConnect.closedb()
                console.log("CLOSE")
                .then(()=>done())
                .catch((err)=>done(err))
    })
}

module.exports = setupTestDb;