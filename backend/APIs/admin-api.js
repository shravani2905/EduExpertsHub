//mini application for Author API
const exp = require('express');
const adminApp = exp.Router();
const bcryptjs = require('bcryptjs');
adminApp.use(exp.json());
const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const verifyToken=require('../Middlewares/verfiyToken')

require('dotenv').config();
let adminscollection;
//get usercollection app
adminApp.use((req,res,next)=>{
    adminscollection=req.app.get('adminscollection')
    next()
})
//Author registration
adminApp.post('/user', expressAsyncHandler(async (req, res) => {
    const newUser = req.body;
    const dbuser = await adminscollection.findOne({ username: newUser.username });
    if (dbuser != null) {
        res.send({ message: "user exists" });
    } else {
        const hashedPassword = await bcryptjs.hash(newUser.password, 6);
        newUser.password = hashedPassword;
        await adminscollection.insertOne(newUser);
        res.send({ message: "User created" });
    }
}));
//Author Login
adminApp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    const dbUser = await adminscollection.findOne({ username: userCred.username });
    if (dbUser === null) {
        res.send({ message: "Invalid username" });
    } else {
        const status = await bcryptjs.compare(userCred.password, dbUser.password);
        if (status === false) {
            res.send({ message: "Invalid password" });
        } else {
            const signedToken = jwt.sign({ username: dbUser.username }, process.env.SECRET_KEY, { expiresIn: '1d' });
            res.send({ message: "login success", token: signedToken, user: dbUser });
        }
    }
}));



// Export the adminApp router
module.exports = adminApp;





