//mini application for User API
const exp = require('express');
const userApp = exp.Router();
const bcryptjs = require('bcryptjs');
userApp.use(exp.json());
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verifyToken=require('../Middlewares/verfiyToken')

let userscollection;
let articlescollection;
userApp.use((req, res, next) => {
    userscollection = req.app.get('userscollection');
    articlescollection = req.app.get('articlescollection');
    userinfo=req.app.get('userinfo');
    next();
});
//User registration
userApp.post('/user', expressAsyncHandler(async (req, res) => {
    const newUser = req.body;
    const dbuser = await userscollection.findOne({ facultyId: newUser.facultyId });
    if (dbuser != null) {
        res.send({ message: "user exists" });
    } else {
        const hashedPassword = await bcryptjs.hash(newUser.password, 6);
        newUser.password = hashedPassword;
        await userscollection.insertOne(newUser);
        res.send({ message: "User created" });
    }
}));
//User Login
userApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    const dbUser = await userscollection.findOne({ facultyId: userCred.facultyId });
    if (dbUser === null) {
        res.send({ message: "Invalid facultyID" });
    } else {
        const status = await bcryptjs.compare(userCred.password, dbUser.password);
        if (status === false) {
            res.send({ message: "Invalid password" });
        } else {
            const signedToken = jwt.sign({ username: dbUser.facultyId }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.send({ message: "login success", token: signedToken, user: dbUser });
        }
    }
}));

userApp.put('/data', verifyToken, expressAsyncHandler(async (req, res) => {
    // Extract modified data from the request body
    const modifiedData = req.body;

    try {
        // Check if data with the specified facultyId already exists
        let existingData = await userinfo.findOne({ facultyId: modifiedData.facultyId });

        if (existingData) {
            // Append to the existing data
            let updatedData = await userinfo.updateOne(
                { facultyId: modifiedData.facultyId },
                { $push: modifiedData }
            );
            
            // Fetch the latest updated data
            let latestData = await userinfo.findOne({ facultyId: modifiedData.facultyId });
            res.status(200).send({ message: "Data appended", data: latestData });
        } else {
            // Insert the new data if it doesn't exist
            let savedData = await userinfo.insertOne(modifiedData);
            res.status(201).send({ message: "Data added", data: savedData });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
    }
}));


// Export the userApp router
module.exports = userApp;