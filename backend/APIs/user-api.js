const exp = require('express');
const userApp = exp.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
const verifyToken = require('../Middlewares/verfiyToken');
require('dotenv').config();

userApp.use(exp.json());

let userscollection;
let articlescollection;
let userinfo;

userApp.use((req, res, next) => {
    userscollection = req.app.get('userscollection');
    articlescollection = req.app.get('articlescollection');
    userinfo = req.app.get('userinfo');
    next();
});

// User registration
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

// User login
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
            const signedToken = jwt.sign({ facultyId: dbUser.facultyId }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.send({ message: "login success", token: signedToken, user: dbUser });
        }
    }
}));

// Update user data
userApp.put('/data', verifyToken, expressAsyncHandler(async (req, res) => {
    try {
        const modifiedData = req.body;
        const { facultyId, dateOfModification, ...restOfData } = modifiedData;

        let existingData = await userinfo.findOne({ facultyId: facultyId });

        if (existingData) {
            let updateFields = { dateOfModification };

            for (let key in restOfData) {
                if (Array.isArray(restOfData[key])) {
                    if (!updateFields[key]) {
                        updateFields[key] = [];
                    }
                    updateFields[key] = { $each: restOfData[key] };
                } else {
                    updateFields[key] = restOfData[key];
                }
            }

            await userinfo.updateOne(
                { facultyId: facultyId },
                {
                    $set: updateFields
                }
            );

            let latestData = await userinfo.findOne({ facultyId: facultyId });
            res.status(200).send({ message: "Data modified", data: latestData });
        } else {
            modifiedData.facultyId = facultyId;
            let savedData = await userinfo.insertOne(modifiedData);
            res.status(201).send({ message: "Data added", data: savedData });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error });
    }
}));

module.exports = userApp;
