//create express app
const exp=require('express');
const app=exp()
require('dotenv').config() //process.env.PORT
const mongoClient=require('mongodb').MongoClient;
const path=require('path')

//deploy react build in this server
app.use(exp.static(path.join(__dirname,'../fieldproject/build')))
//to parse the body of req
app.use(exp.json())

//connect to DB
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db obj
    const fieldproject=client.db('fieldproject')
    //get collection obj
    const userscollection=fieldproject.collection('userscollection')
    const adminscollection=fieldproject.collection('adminscollection')
    const userinfo=fieldproject.collection('userinfo')
    //share colelction obj with express app
    app.set('userscollection',userscollection)
    app.set('adminscollection',adminscollection)
    app.set('userinfo',userinfo)
    //confirm db connection status
    console.log("DB connection success")
})
.catch(err=>console.log("Err in DB connection",err))


//import API routes
const userApp=require('./APIs/user-api')
const adminApp=require('./APIs/admin-api')

//if path starts with user-api, send req to userApp
app.use('/user-api',userApp)
//if path starts with admin-api, send req adminApp
app.use('/admin-api',adminApp)

//deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../fieldproject/build/index.html'))
})

//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})
//assign port number
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Web server on port ${port}`))