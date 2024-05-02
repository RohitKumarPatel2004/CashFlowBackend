import { PanelistAlreadyExistException } from "../../Exceptions/PanelistAlreadyExist";
import {execute} from "../../Config/Database/QueryWrapperMysql"
import {ErrorWhileRegisterPanelistException} from '../../Exceptions/ErrorWhileRegisterPanelist'
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
export const PostSignupAuthDataService = {
    PostSignupAuthData: async ( request: Request, response: Response) => {
      try {
        const { username , email , password } = request.body;
      if (typeof(username)!=="string"|| typeof(email)!=="string"|| typeof(password)!=="string" ||!username || !email || !password) {
        throw new ErrorWhileRegisterPanelistException
      } 
      const userExistsQuery = 'SELECT * FROM users_detail WHERE  email = ?';
      const existingUsers:any = await execute(userExistsQuery, [email]);
      if (existingUsers.length>0) {
        response.status(200).json({ message: 'Panelist Already Exists. Please Login.' });
        throw new PanelistAlreadyExistException
      }
      const hashedPassword = await bcrypt.hash(password, 10);
       const createUserQuery = 'INSERT INTO users_detail (full_name, email, password) VALUES (?, ?, ?)';
      await execute(createUserQuery, [username, email, hashedPassword])
      response.status(200).json({ message: 'Signup successful'});
    } catch (error: any) {
      console.error('Error Signup data:', error.message);
      throw error;
    }
  },
};

