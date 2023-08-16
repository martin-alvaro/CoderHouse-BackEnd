import UserDao from '../daos/mongodb/user.dao.js'

const userDao  = new UserDao

export const registerUser = async(req,res)=>{
    try {
        const newUser = await userDao.registerUser(req.body);
        if(newUser) res.redirect('/login');
        else res.redirect('/errorRegister');
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


export const logoutUser = (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw err; 
        }
        res.redirect('/login');
      });
    } catch (error) {
      console.log(error); 
      res.redirect('/'); 
    }
  };

export const loginResponse = async(req,res,next)=>{
  try {
    const user = await userDao.getById(req.session.passport.user)
    res.json({
      msg: 'Login ok',
      user
    })
  } catch (error) {
    next(error.message)
  }
}

export const githubResponse = async(req,res,next)=>{
  try {
    const {firstNmae, lastName, email, isGithub}= req.user
      res.json({
        msg:'register o login ok',
        session: req.session,
        userData:{
          firstNmae, lastName, email, isGithub
        }
      })
  } catch (error) {
    next(error.message)
  }
}



  











  