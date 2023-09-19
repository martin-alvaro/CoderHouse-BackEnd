import * as messageService from "../daos/mongodb/message.dao.js";

export const getAll = async () => {
  try {
    const messages = await messageService.getAll();
    return messages;
  } catch (error) {
    console.log(error);
  }
};

export const create = async (message) => {
  try {
    const newMessage = await messageService.create(message);
    return newMessage;
  } catch (error) {
    console.log(error);
    return null;
  }
};