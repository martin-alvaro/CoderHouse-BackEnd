import UserDao from '../daos/mongodb/user.dao.js';
import { UserDTO } from '../dto/user.dto.js';
import transporter from '../mailling/transporter.js';
import { logger } from '../logger.js';

const userDao = new UserDao();

export const registerUser = async (req, res) => {
  try {
    const { email, password, first_name, last_name, isGithub, age } = req.body;
    const userDTO = new UserDTO(email, password, first_name, last_name, isGithub, age);
    const newUser = await userDao.registerUser(userDTO);
    if (newUser) {

      const mailOptions = {
        from: 'martinalvaro3175@gmail.com',
        to: email,
        subject: '¡Bienvenido a nuestra aplicación!',
        text: 'Gracias por registrarte en nuestra aplicación. ¡Esperamos que disfrutes tu experiencia!',
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          logger.error(error);
        } else {
          logger.info('Correo electrónico de bienvenida enviado:', info.response);
        }
      });

      res.redirect('/login');
    } else {
      res.redirect('/errorRegister');
    }
  } catch (error) {
    logger.error(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDTO = new UserDTO(email, password);
    const user = await userDao.loginUser(userDTO);
    if (user) {
      req.session.user = user;
      res.redirect('/');
    } else {
      res.redirect('/errorLogin');
    }
  } catch (error) {
    logger.error(error);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = req.session.user;

    const currentUserDTO = {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      role: user.role
    };

    res.json(currentUserDTO);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const logoutUser = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        logger.error(err);
        throw err;
      }
      res.redirect('/login');
    });
  } catch (error) {
    logger.error(error);
    res.redirect('/');
  }
};

export const loginResponse = async (req, res, next) => {
  try {
    const user = await userDao.getById(req.session.passport.user);
    res.json({
      msg: 'Login ok',
      user
    });
  } catch (error) {
    next(error.message);
  }
};

export const githubResponse = async (req, res, next) => {
  try {
    const { firstNmae, lastName, email, isGithub } = req.user;
    res.json({
      msg: 'register o login ok',
      session: req.session,
      userData: {
        firstNmae,
        lastName,
        email,
        isGithub
      }
    });
  } catch (error) {
    next(error.message);
  }
};
