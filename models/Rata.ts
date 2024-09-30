import mongoose from "mongoose";

const RataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: { type: String, required: true },
    points: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Rata || mongoose.model("Rata", RataSchema);