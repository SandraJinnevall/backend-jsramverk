const express = require('express')
const router = express()
const Comments = require("../../models/Comments");
const mongoose = require('mongoose') //libary for mongodb.
const { DB } = require('../../db/database')

router.get('/', async (req, res) => {
    try {
        await mongoose.connect(DB, { useNewUrlParser: true })
        const comments = await Comments.find()
        res.status(200).json({comments})
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
    finally {
        mongoose.connection.close()
    }
})

router.post('/', async (req, res) => {
    const newComments = new Comments(req.body)
    console.log(req.body)
    try {
        await mongoose.connect(DB, { useNewUrlParser: true })
        const newComments1 = await newComments.save()
        res.status(200).json({newComments1})
    } catch (error) {
        res.status(500).json({ message: error.message })
    } 
    finally {
        mongoose.connection.close()
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        await mongoose.connect(DB, { useNewUrlParser: true })
        const removed = await Comments.findByIdAndDelete(id);
        if (!removed) throw Error('Something went wrong ')
        res.status(200).json({removed});
    } catch (error) {
        res.status(500).send('error, couldnt delete');
    } finally {
        await mongoose.connection.close()
    }
})

module.exports = router