import { execute } from "../../Config/Database/QueryWrapperMysql";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

export const ChangePasswordService = {
    newPassWord: async (request: Request, response: Response) => {
        try {
            const { currentPassword, newPassword, email } = request.body;

            const getPasswordQuery = `SELECT password FROM user_detail WHERE email = ?`;
            const passwordResult: any = await execute(getPasswordQuery, [email]);

            if (passwordResult.length === 0) {
                return response.status(400).json({ success: false, status: 400, message: "Invalid User" });
            }

            const oldPassword = passwordResult[0].password;

            const isMatch = await bcrypt.compare(currentPassword, oldPassword);
            if (!isMatch) {
                return response.status(400).json({ success: false, status: 400, message: "Current password is incorrect" });
            }

            const newHashedPassword = await bcrypt.hash(newPassword, 10);
            const updatePasswordQuery = `UPDATE user_detail SET password = ? WHERE email = ?`;

            await execute(updatePasswordQuery, [newHashedPassword, email]);

            response.status(200).json({ success: true, status: 200, message: "Password updated successfully" });
        } catch (error) {
            response.status(500).json({ success: false, status: 500, message: "Server error" });
        }
    }
};
