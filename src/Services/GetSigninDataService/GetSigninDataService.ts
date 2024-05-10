import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { execute } from "../../Config/Database/QueryWrapperMysql";
import { HttpException } from "../../Exceptions/Http_Exception";

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
          return response.status(200).json({
            success: true, user, token
          });
        } else {
          throw new HttpException(401, "Passwords don't match");
        }
      } else {
        throw new HttpException(401, "Invalid email or password");
      }
    } catch (error: any) {
      const errorMessage = 'Error during login: ' + error.message;
      console.error(errorMessage);
      if (error instanceof HttpException) {
        return response.status(error.status).json({ success: false, error: error.message, errorMessage });
      } else {
        return response.status(500).json({ success: false, error: "Internal server error", errorMessage });
      }
    }
  },
};
