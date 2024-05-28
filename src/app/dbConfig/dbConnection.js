import mongoose from "mongoose";
const mongoURI = process.env.MONGO_URI

export async function connect() {


    try {
        if(mongoose.connection && mongoose.connection[0]) return;
        await mongoose.connect(mongoURI, {
            // dbName : "LinkShortner",
        });

        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}