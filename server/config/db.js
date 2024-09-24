import mongoose from "mongoose";

const connectDB = async () => {
	try {
		console.log(`Connecting to MongoDB...`);
		await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${mongoose.connection.host}`);
	} catch (error) {
		console.log(`Error while connecting to MongoDB`);
		console.error(`Error: ${error.message}`);
		setTimeout(connectDB, 1000 * 12);
	}
};

export default connectDB;
