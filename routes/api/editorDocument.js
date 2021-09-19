const express = require('express')
const mongoose = require('mongoose') //libary for mongodb.
const router = express()
const { DB, Schema } = require('../../db/database')
const database = require("../../db/database.js");


router.get('/', async (req, res) => {
    try {
        await mongoose.connect(DB, console.log("MongoDB connected"));
        const editorDocuments = await Schema.find()
        res.status(200).json({editorDocuments})
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
    finally {
        await mongoose.connection.close()
        console.log("database was shut down")
    }
})

router.post('/', async (req, res) => {
    const neweditorDocument = new Schema(req.body)
    console.log("ny: ", neweditorDocument)
    try {
        await mongoose.connect(DB, console.log("MongoDB connected"));
        const editorDocument1 = await neweditorDocument.save()
        res.status(200).json({editorDocument1})
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
    finally {
        await mongoose.connection.close()
        console.log("database was shut down1")
    }
})

router.put('/:id', async (req, res) => {
    try {
        await mongoose.connect(DB, console.log("MongoDB connected"));
        const response = await Schema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            context: 'query'
           })
        if (!response) throw Error('couldnt find by ID')

        res.status(200).json({ success: true, data: response })
    } catch (error) {
        res.status(500).json({ message: error.message })
    } finally {
        await mongoose.connection.close()
        console.log("database was shut down")
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await mongoose.connect(DB, console.log("MongoDB connected"));
        const removed = await Schema.findByIdAndDelete(id);
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json({removed});
    } catch (error) {
        res.status(500).send('error, couldnt delete');
    } finally {
        await mongoose.connection.close()
        console.log("database was shut down2")
    }
})

module.exports = router