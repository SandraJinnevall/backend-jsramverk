const mongooseConnect = require('../db/database');
const mongoose = require('mongoose');
const { after, before, beforeEach } = require('mocha');
const { DB, Schema } = require('../db/database')

let setupTestDb = async () => {
    await mongoose.connect(DB);
    var db = await mongoose.connection;
    before (()=>{
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback () {
        console.log("h");
        });
    })

 

    // beforeEach((done)=>{
    //     db.listCollections({name: "testeditordocuments"})
    //         .next((error,collection)=>{
    //             if(collection){
    //                 db.dropCollection("testeditordocuments")
    //                 .then(() => done())
    //                 .catch((err) => done(err))
    //             }
    //             else{
    //                 done(error)
    //             }
    //         })
        
        
    // })

    after (()=>{
        db.close()
    })
}

module.exports = setupTestDb;