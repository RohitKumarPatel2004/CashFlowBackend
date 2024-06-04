import { v4 as uuidv4 } from 'uuid';
import { PanelistAlreadyExistException } from "../../Exceptions/PanelistAlreadyExist";
import { execute } from "../../Config/Database/QueryWrapperMysql";
import { ErrorWhileRegisterPanelistException } from '../../Exceptions/ErrorWhileRegisterPanelist';
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

export const PostSignupAuthDataService = {
  PostSignupAuthData: async (request: Request, response: Response) => {
    try {
      const { username, email, password, number } = request.body;
      
      if (typeof(username) !== "string" || typeof(email) !== "string" || typeof(password) !== "string" || !username || !email || !password) {
        throw new ErrorWhileRegisterPanelistException();
      }
      
      const userExistsQuery = 'SELECT * FROM user_detail WHERE email = ?';
      const existingUsers: any = await execute(userExistsQuery, [email]);
      
      if (existingUsers.length > 0) {
        response.status(200).json({ success: true, status: 200, message: 'Panelist Already Exists. Please Login.' });
        throw new PanelistAlreadyExistException();
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const uniqueId = uuidv4();
      const createUserQuery = `
        INSERT INTO user_detail (full_name, email, password, number, location, profilePicture, unique_id)
        VALUES (?, ?, ?, ?, '', '', ?)
      `;
      await execute(createUserQuery, [username, email, hashedPassword, number, uniqueId]);
      response.status(200).json({ success: true, status: 200, message: 'Signup successful' });
    } catch (error: any) {
      response.status(500).json({ success: false, status: 500, message: error.message });
      throw error;
    }
  },
};
