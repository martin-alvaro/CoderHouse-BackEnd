import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js'; 
import { UserModel } from '../daos/mongodb/models/user.model.js'; 


const router = Router();

router.get('/current', authMiddleware, async (req, res) => {
  try {
    const currentUser = req.session.user;
    if (currentUser) {
      res.json(currentUser);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;
