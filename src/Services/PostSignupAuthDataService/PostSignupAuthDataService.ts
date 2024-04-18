import {execute} from "../../Config/Database/QueryWrapperMysql"
import {ErrorWhileRegisterPanelistException} from '../../Exceptions/ErrorWhileRegisterPanelist'
import { Request, Response } from "express";
export const PostSignupAuthDataService = {
    PostSignupAuthData: async ( request: Request, response: Response) => {
      try {
        const { username , email , password } = request.body;

      if (typeof(username)!=="string"|| typeof(email)!=="string"|| typeof(password)!=="string" ||!username || !email || !password) {
        throw new ErrorWhileRegisterPanelistException
      }
      
        
       const createUserQuery = 'INSERT INTO users_detail (username, email, password) VALUES (?, ?, ?)';
      await execute(createUserQuery, [username, email, password])
      
      response.status(200).json({ message: 'Signup successful' });
    } catch (error: any) {
      console.error('Error Signup data:', error.message);
      throw error;
    }
  },
};

