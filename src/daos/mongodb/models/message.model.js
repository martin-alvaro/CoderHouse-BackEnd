import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const MessageModel = mongoose.model("messages", messagesSchema);