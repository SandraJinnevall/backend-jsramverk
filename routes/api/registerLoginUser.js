const express = require('express')
const router = express()
const User = require("../../models/User");
const mongoose = require('mongoose') //libary for mongodb.
const { DB } = require('../../db/database')
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const user = new User(req.body);
    try {
        await mongoose.connect(DB, { useNewUrlParser: true })
        let userExist = await User.find({ email: req.body.email });
        if (userExist.length >= 1) {
            return res.status(409).json({
                message: "email already in use"
            });
        } else {
            let data = await user.save();
            const token = await user.generateAuthToken();
            res.status(201).json({ data, token });
        }
    } catch (err) {
         res.status(400).json({ err: err });
    } finally {
        mongoose.connection.close()
    }
});
router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        await mongoose.connect(DB, { useNewUrlParser: true })
        const user = await User.findByCredentials(email, password);
        if (!user) {
          return res.status(401).json({ error: "Login failed! Check authentication credentials" });
        }
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (err) {
         res.status(400).json({ err: err });
    } finally {
        mongoose.connection.close()
    }
});
router.get("/getuser", async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        console.log(token);
        const decoded = jwt.verify(token, "secret");
        req.userData = decoded;
        console.log(req.userData);
        await res.json(req.userData);
        next();
    } catch (err) {
    return res.status(401).json({
        message: "Authentification Failed"
    });
    } finally {
        mongoose.connection.close()
    }
});

router.get("/getAllUsers", async (req, res) => {
    try {
        await mongoose.connect(DB, { useNewUrlParser: true })
        const allUsers = await User.find({}, { name: 1, _id: 1 })
        res.status(200).json({allUsers})
    } catch (err) {
    return res.status(401).json({
        message: "Authentification Failed"
    });
    } finally {
        mongoose.connection.close()
    }
});

module.exports = router;