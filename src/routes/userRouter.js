import { Router } from "express";
import { loginUser, registerUser, logoutUser, githubResponse } from "../controllers/user.controller.js";
import passport from "passport";
import { isAuth } from '../middlewares/isAuth.js';
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post("/logout", logoutUser);

router.get('/:email([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$)' , (req,res)=>{
    const {email} = req.params
        res.send({
            msg: 'email valido',
            email
        })
})

router.get('/register-github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/profile-github', passport.authenticate('github', { scope: ['user:email']}), githubResponse)

export default router;
