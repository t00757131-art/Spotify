import app from "./src/app.ts";
import "dotenv/config";
import ConnectToDb from "./src/config/database.ts";

const port  = process.env.PORT;

app.get('/',(req,res)=>{
    res.json({message:"Server working properly"})
})


const startConnection  =  async()=>{
    try{

     await ConnectToDb();
     console.log("Database connected successfully 🎉")

     app.listen(port,()=>{
        console.log("Server is listening on port 3000 ✅")
     })

    }catch(err){
        console.log('Failed to start server ',err);
        process.exit(1);

    }
}

startConnection();