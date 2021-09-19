const express = require('express')
const mongoose = require('mongoose') //libary for mongodb.
const router = express()
const { DB, Schema } = require('../../db/database')
const database = require("../../db/database.js");

router.get('/', async (req, res) => {
    try {
        await mongoose.connect(DB, { useNewUrlParser: true })
        const editorDocuments = await Schema.find()
        res.status(200).json({editorDocuments})
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
    finally {
        mongoose.connection.close()
    }
})

router.post('/', async (req, res) => {
    const neweditorDocument = new Schema(req.body)
    try {
        await mongoose.connect(DB, { useNewUrlParser: true })
        const editorDocument1 = await neweditorDocument.save()
        res.status(200).json({editorDocument1})
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
    finally {
        mongoose.connection.close()
    }
})

router.put('/:id', async (req, res) => {
    try {
        await mongoose.connect(DB, { useNewUrlParser: true })
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
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await mongoose.connect(DB, { useNewUrlParser: true })
        const removed = await Schema.findByIdAndDelete(id);
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json({removed});
    } catch (error) {
        res.status(500).send('error, couldnt delete');
    } finally {
        await mongoose.connection.close()
    }
})

module.exports = router