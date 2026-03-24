import mongoose from "mongoose";
import "dotenv/config";

const DB_URL = process.env.DATABASE_URL;

if(!DB_URL){
    throw new Error("Missing database connection string");
}

async function ConnectToDb(){
    try{

        await mongoose.connect(DB_URL!);

    }catch(err){
        console.log("Failed to connect with Db with Id : ",mongoose.connection.id);
        process.exit(1);

    }
}

export default ConnectToDb;