import mongoose from "mongoose";
import 'dotenv/config';
import { logger } from '../../logger.js';

const connectionString = process.env.MONGO_ATLAS_URL;

try {
    await mongoose.connect(connectionString);
    logger.info('Conectado a la base de datos de MongoDB!!');
} catch (error) {
    logger.error(error);
}
