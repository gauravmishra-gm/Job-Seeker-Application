import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
    dbName: "MERN_STACK_JOB_SEEKING",
})
.then(()=>{
    console.log("Connected to Database!")
})
.catch((err)=> {
    console.log(`Some Error Occured while connecting to Database: ${err}`);
});
};