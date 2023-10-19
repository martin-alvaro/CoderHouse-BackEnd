import { TicketModel } from "../daos/mongodb/models/ticket.model.js";
import { logger } from '../logger.js';

export const create = async (ticketData) => {
  try {
    const newTicket = await TicketModel.create(ticketData);
    return newTicket;
  } catch (error) {
    logger.info(error);
    throw new Error(error.message);
  }
};

export const getById = async (id) => {
  try {
    const ticket = await TicketModel.findById(id);
    return ticket || false;
  } catch (error) {
    logger.info(error);
    throw new Error(error.message);
  }
};
