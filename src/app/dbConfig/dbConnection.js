import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI;

export async function connect() {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log('Already connected to the database.');
            return;
        }
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
}
