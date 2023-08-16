import { dirname } from 'path';
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));


import { hashSync, compareSync , genSaltSync} from 'bcrypt'; 

export const createHash = (password) => {
   return hashSync(password, genSaltSync(10));
}

export const isValidPassword= (password, user) => compareSync(password, user.password)