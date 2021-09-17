const mongooseConnect = require('../db/database');
const mongoose = require('mongoose');
const { after, before } = require('mocha');

let setupTestDb = async () => {
    before ((done)=>{
         mongooseConnect.connectdb()
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
                .then(()=>done())
                .catch((err)=>done(err))
    })
}

module.exports = setupTestDb;