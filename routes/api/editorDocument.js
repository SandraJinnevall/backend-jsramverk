const { Router } = require('express')
const mongoose = require('mongoose') //libary for mongodb.
const router = Router()
const { DB, Schema } = require('../../db/database')

console.log("schema:", Schema)


router.get('/', async (req, res) => {
    try {
        await mongoose.connect(DB, console.log("MongoDB connected"));
        const editorDocuments = await Schema.find()
        if (!editorDocuments) throw new Error('There is no editorDocuments')
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
    try {
        await mongoose.connect(DB, console.log("MongoDB connected"));
        const editorDocument = await neweditorDocument.save()
        if (!editorDocument) throw new Error('Coulnt save the document')
        res.status(200).json({editorDocument})
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
    finally {
        await mongoose.connection.close()
        console.log("database was shut down")
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
        const removed = await Schema.findByIdAndDelete(id)
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json({removed})
    } catch (error) {
        res.status(500).json({ message: error.message })
    } finally {
        await mongoose.connection.close()
        console.log("database was shut down")
    }
})

module.exports = router