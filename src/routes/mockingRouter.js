import express from 'express';
import { getMockProducts } from '../services/mocking.service.js';

const router = express.Router();

router.get('/', getMockProducts);

export default router;
