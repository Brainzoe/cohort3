const mongoose = require('mongoose');

async function connectDb(){
    try{
        const res = await mongoose.connect('mongodb://0.0.0:27017/cohort3Db');
         console.log("connected to db successfully")
         
    }
    catch(err){
        console.log(err.message)
    }
};

module.exports = {connectDb};