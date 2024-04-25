import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { execute } from "../../Config/Database/QueryWrapperMysql";

export const GetSigninDataService = {
  Login: async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const query = 'SELECT * FROM users_detail WHERE email = ?';
      const bindValues = [email]; 
      const result: any = await execute(query, bindValues);

      if (result.length === 1) {
         const user = result[0];
         const isPasswordMatch = await bcrypt.compare(password, user.password);

         if (isPasswordMatch) {
           const token = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "24h" });
           return response.status(200).json({ user, token });
         } else {
           return response.status(401).send("Passwords don't match");
         }
      } else {
         return response.status(401).send("Invalid email or password");
      }
    } catch (error: any) {
      console.error('Error during login:', error.message);
      return response.status(500).send("Internal server error");
    }
  },
};
