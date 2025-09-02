import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["admin", "manager", "user"],
            default: "user",
        },
        refreshToken: { type: String, default: null },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
