import { TicketModel } from "../daos/mongodb/models/ticket.model.js";

export const create = async (ticketData) => {
  try {
    const newTicket = await TicketModel.create(ticketData);
    return newTicket;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const ticket = await TicketModel.findById(id);
    return ticket || false;
  } catch (error) {
    console.log(error);
  }
};

