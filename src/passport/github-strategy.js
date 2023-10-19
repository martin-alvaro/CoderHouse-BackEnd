import { Strategy as GithubStrategy } from "passport-github2";
import passport from "passport";
import UserDao from "../daos/mongodb/user.dao.js";
import { logger } from '../logger.js';

const userDao = new UserDao()

const strategyOptions = {
    clientID: 'Iv1.0568e0be4d2b239e',
    clientSecret: 'c3dee7f89640c6a2a9b27845a433e3222e2f27d7',
    callbackURL: 'http://localhost:8080/users/profile-github',
};

const registerOrLogin = async (accessToken, refreshToken, profile, done) => {
    logger.info('PROFILE --> ', profile);
    const email = profile._json.email !== null ? profile._json.email : profile_json.blog;
    const user = await userDao.getByEmail(email);
    if (user) return done(null, user);
    const newUser = await userDao.registerUser({
        firstName: profile._json.name.split(' ')[0],
        lastName: profile._json.name.split(' ')[1],
        email,
        password: '',
        isGithub: true
    });
    return done(null, newUser);
}

passport.use('github', new GithubStrategy(strategyOptions, registerOrLogin));
