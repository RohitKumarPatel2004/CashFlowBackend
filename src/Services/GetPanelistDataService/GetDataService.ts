import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { execute } from "../../Config/Database/QueryWrapperMysql";

export const GetDataService = {
  Login: async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;
      const query = 'SELECT * FROM users_detail WHERE email = ? AND BINARY password = ?';
      const bindValues = [email, password]; 
      const result: any = await execute(query, bindValues);

      if (result.length === 1) {
         const user = result[0];
         const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "24h" });
         return response.status(200).json({ user, token });
      } else {
         return response.status(401).send("Invalid email or password");
      }
    } catch (error: any) {
      console.error('Error during login:', error.message);
      return response.status(500).send("Internal server error");
    }
  },
};
