import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js'; 
import * as controller from '../controllers/user.controller.js';

const router = Router();

router.get('/current', authMiddleware, controller.getCurrentUser);

export default router;
