import UserDao from '../daos/mongodb/user.dao.js'

const userDao  = new UserDao

export const registerUser = async(req,res)=>{
    try {
        const newUser = await userDao.registerUser(req.body)
        if(newUser) res.redirect('/login')
        else res.redirect('/errorRegister')
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await userDao.loginUser(req.body);
        if (user) {
            req.session.user = user;
            res.redirect('/'); 
        } else {
            res.redirect('/errorLogin');
        }
    } catch (error) {
        console.log(error);
    }
};












  