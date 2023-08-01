import { MessageModel } from "./models/message.model.js";

export const getAll = async () => {
  try {
    const messages = await MessageModel.find();
    return messages;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (message) => {
  try {
    const newMessage = await MessageModel.create(message);
    return newMessage;
  } catch (error) {
    console.log(error);
  }
};