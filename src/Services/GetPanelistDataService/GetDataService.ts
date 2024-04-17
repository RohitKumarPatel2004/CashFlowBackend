import { Request, Response } from "express";
import { execute } from "../../Config/Database/QueryWrapperMysql";

export const GetDataService = {
  Login: async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;
      const query = 'SELECT * FROM users_detail WHERE email = ? AND  BINARY  password = ?';
      const bindValues = [email, password]; 
      const result: any = await execute(query, bindValues);

      if (result.length === 1) {
         return response.status(200).send("Login successful");
      } else {
         return response.status(401).send("Invalid email or password");
      }
    } catch (error: any) {
      console.error('Error during login:', error.message);
      return response.status(500).send("Internal server error");
    }
  }
};
