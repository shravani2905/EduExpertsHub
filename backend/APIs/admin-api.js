const exp = require('express');
const adminApp = exp.Router();
const bcryptjs = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middlewares/verfiyToken');
require('dotenv').config();

adminApp.use(exp.json());

let adminscollection;
let userinfo;

adminApp.use((req, res, next) => {
    adminscollection = req.app.get('adminscollection');
    userinfo = req.app.get('userinfo');
    next();
});

// Author registration
adminApp.post('/user', expressAsyncHandler(async (req, res) => {
    const newUser = req.body;
    const dbuser = await adminscollection.findOne({ facultyId: newUser.facultyId });
    if (dbuser != null) {
        res.send({ message: "user exists" });
    } else {
        const hashedPassword = await bcryptjs.hash(newUser.password, 6);
        newUser.password = hashedPassword;
        await adminscollection.insertOne(newUser);
        res.send({ message: "User created" });
    }
}));

// Author login
adminApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    const dbUser = await adminscollection.findOne({ facultyId: userCred.facultyId });
    if (dbUser === null) {
        res.send({ message: "Invalid FacultyID" });
    } else {
        const status = await bcryptjs.compare(userCred.password, dbUser.password);
        if (status === false) {
            res.send({ message: "Invalid password" });
        } else {
            const signedToken = jwt.sign({ facultyId: dbUser.facultyId }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.send({ message: "login success", token: signedToken, user: dbUser });
        }
    }
}));

// Get all user information
adminApp.get('/userinfo', verifyToken, expressAsyncHandler(async (req, res) => {
    try {
        const users = await userinfo.find().toArray();
        res.status(200).send({ message: "Users fetched successfully", data: users });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
    }
}));
adminApp.get('/userinfo/:id', verifyToken, expressAsyncHandler(async (req, res) => {
    const currentUserFacultyId = req.params.id; // Assuming facultyId is in req.params.id

    try {
        const user = await userinfo.findOne({ facultyId: currentUserFacultyId });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).send({ message: "User fetched successfully", data: user });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
    }
}));

// Export the adminApp router
module.exports = adminApp;
