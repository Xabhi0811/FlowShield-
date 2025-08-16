import mongoose from "mongoose";

const blockedSiteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("BlockedSite", blockedSiteSchema);
