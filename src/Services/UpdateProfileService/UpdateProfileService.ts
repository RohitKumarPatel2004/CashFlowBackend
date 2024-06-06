import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { execute } from '../../Config/Database/QueryWrapperMysql';

export const UpdateProfileService = {
  updateProfile: async (request: Request, response: Response) => {
    try {
      const { email, full_name, location } = request.body;
      let profilePicture: Buffer | null = null;

      if (request.file) {
        const filePath = path.join(__dirname, '../../public/image', request.file.filename);
        profilePicture = fs.readFileSync(filePath); // Read the file from disk
        fs.unlinkSync(filePath);
      }

      let query: string;
      let values: any[];

      if (profilePicture) {
        query = 'UPDATE user_detail SET full_name = ?, location = ?, profilePicture = ? WHERE email = ?';
        values = [full_name, location, profilePicture, email];
      } else {
        query = 'UPDATE user_detail SET full_name = ?, location = ? WHERE email = ?';
        values = [full_name, location, email];
      }

      const result: any = await execute(query, values);

      if (result.affectedRows === 0) {
        response.status(404).json({ success: false, message: 'User not found' });
      } else {
        response.status(200).json({ success: true, message: 'Profile updated successfully' });
      }

    } catch (error) {
      console.error('Error:', error);
      response.status(500).json({ success: false, message: 'An error occurred while updating the profile' });
    }
  }
};
