import { Request, Response } from "express";
import { execute } from "../../Config/Database/QueryWrapperMysql";

export const GetProfileService = {
  getUser: async (request: Request, response: Response) => {
    try {
      const { email } = request.body; 

      const getUserQuery = `
        SELECT id, full_name, email, number, location, profilePicture, joinedDate ,balance
        FROM user_detail
        WHERE email = ?
      `;
      
    
      const userData:any = await execute(getUserQuery, [email]);
      
   
      if (userData.length === 0) {
        return response.status(404).json({ success: false, message: 'User not found' });
      }
      
  
      response.status(200).json({ success: true, userData: userData[0] });
    } catch (error: any) {
     
      response.status(500).json({ success: false, message: error.message });
    }
  }
};
