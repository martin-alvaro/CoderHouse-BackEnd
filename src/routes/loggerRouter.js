import { Router } from 'express';
import { logger } from '../logger.js'; 

const router = Router();

router.get("/", (req, res) => {
  logger.debug('Este es un mensaje de nivel debug');
  logger.http('Este es un mensaje de nivel http');
  logger.info('Este es un mensaje de nivel info');
  logger.warn('Este es un mensaje de nivel warning');
  logger.error('Este es un mensaje de nivel error');
  
  res.send('Mensajes de prueba registrados en los niveles de registro.');
});

export default router;
