import * as messageService from "../services/messages.service.js";

export const getAll = async (req, res, next) => {
  try {
    const messages = await messageService.getAll();
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export const newMessage = async (req, res, next) => {
  try {
    const message = req.body;
    const newMessage = await messageService.create(message);

    if (!newMessage) throw new Error("Message could not be created.");

    const io = req.app.get("io");
    const messages = await messageService.getAll();
    io.emit("chat:messages", messages);
    res.json(messages);
  } catch (error) {
    next(error);
  }
};