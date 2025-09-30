import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("❌ Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    // let dbName = "wefik_db";
    let dbName = "wefik_test_db";

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, { dbName })
            .then((mongoose) => {
                console.log("✅ MongoDB connected");
                return mongoose;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
