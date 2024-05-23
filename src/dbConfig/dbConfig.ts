import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('MongoDB connected');
        })
        connection.on('error',(err)=>{
            console.log('MongoDB connection error'+err);
            process.exit(1);
        })
    } catch (error) {
        console.log('Something Went Wrong during connecting MongoDB');
        console.log(error);
    }
}