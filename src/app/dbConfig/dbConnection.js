import mongoose from "mongoose";
const mongoURI = process.env.MONGO_URI

export async function connect() {
    try {
        await mongoose.connect(mongoURI, {});

        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}