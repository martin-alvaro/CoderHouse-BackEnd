import { MessageModel } from "./models/message.model.js";
import { logger } from '../../logger.js';

export const getAll = async () => {
  try {
    const messages = await MessageModel.find();
    return messages;
  } catch (error) {
    logger.error(error);
  }
};

export const create = async (message) => {
  try {
    const newMessage = await MessageModel.create(message);
    return newMessage;
  } catch (error) {
    logger.error(error);
  }
};
