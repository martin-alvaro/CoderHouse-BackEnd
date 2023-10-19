import * as messageService from "../daos/mongodb/message.dao.js";
import { logger } from '../logger.js';

export const getAll = async () => {
  try {
    const messages = await messageService.getAll();
    return messages;
  } catch (error) {
    logger.info(error);
  }
};

export const create = async (message) => {
  try {
    const newMessage = await messageService.create(message);
    return newMessage;
  } catch (error) {
    logger.info(error);
    return null;
  }
};
