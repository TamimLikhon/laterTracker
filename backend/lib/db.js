import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) throw new Error("Mongodb url is missing or not correct");


export async function dbConnect(){
    await mongoose.connect(MONGODB_URI)
}