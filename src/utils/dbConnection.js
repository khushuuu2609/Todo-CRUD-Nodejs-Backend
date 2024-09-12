import mongoose from "mongoose";

const dbcon = async () => {
           try {
            const mongoURI = process.env.DB_URI;
             await mongoose.connect(mongoURI)
             console.log("Db connected sucessfully")
           } catch (error) {
            console.log("Connection failed",error)
           }    
    }

    export default dbcon; 