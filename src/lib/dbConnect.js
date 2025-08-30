import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
	if (isConnected) {
		console.log("✅ Already connected");
		return;
	}

	if (!process.env.MONGODB_URI) {
		throw new Error("Please add your MongoDB URI to .env.local");
	}

	try {
		const db = await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "wefik_db",
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		isConnected = db.connections[0].readyState === 1;
		console.log("✅ MongoDB connected");
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		throw new Error("Failed to connect to MongoDB");
	}
}
