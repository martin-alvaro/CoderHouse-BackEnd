import { UserModel } from "./models/user.model.js";
import { createHash, isValidPassword } from "../../utils.js";


export default class UserDao{

    async registerUser(user) {
        try {
          const { email, password } = user
          const existUser = await this.getByEmail(email)
        console.log('exist users', existUser)
          if (!existUser) {
            if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
              const newUser = await UserModel.create({ 
                ...user,
                password:createHash(password),
                role: 'admin'
               
              });
              return newUser;
            }
            const newUser = await UserModel.create({
              ...user,
                password:createHash(password)
              });
            return newUser;
          } else {
            return false;
          }
        } catch (error) {
          console.log(error);
        }
      }

    async loginUser(user){
        try {
            const {email, password}= user 
            const userExist = await this.getByEmail(email)
            if(userExist){
              const passValid = isValidPassword(password , userExist)
              console.log(passValid);
              if(!passValid) return false
              else return userExist
            }
            else return false
        } catch (error) {
            console.log(error);
        }
        
    }

    async getById(id){
        try {
          const userExist = await UserModel.findById(id)
          if(userExist){
            return userExist
          }else{
            return false
          }

        } catch (error) {
          console.log(error)
        }
    }

    async getByEmail(email){
        try {
            const userExist = await UserModel.findOne({email})
            if(userExist){
              return userExist
            }else{
              return false
            }
        } catch (error) {
            console.log(error)
        }
    }
}