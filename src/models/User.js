import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: { type: String, required: true, trim: true },
        role: {
            type: String,
            enum: ["admin", "manager"],
            default: "user",
        },
        refreshToken: { type: String, default: null },
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
