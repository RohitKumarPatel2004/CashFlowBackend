import { Request, Response } from "express";
import { execute } from "../../Config/Database/QueryWrapperMysql";
import multer from "multer";


const upload = multer();

export const UpdateProfileService = {
  updateLocation: async (request: Request, response: Response) => {
    try {
      const { email, newLocation } = request.body;

      const updateLocationQuery = `
        UPDATE user_detail
        SET location = ?
        WHERE email = ?
      `;

      const result: any = await execute(updateLocationQuery, [newLocation, email]);

      if (result.affectedRows === 0) {
        return response.status(404).json({ success: false, message: 'User not found' });
      }

      response.status(200).json({ success: true, message: 'Location updated successfully' });
    } catch (error: any) {
      response.status(500).json({ success: false, message: error.message });
    }
  },

  updateProfilePicture: async (request: Request, response: Response) => {
    try {
      const { email } = request.body;

      if (!request.file) {
        return response.status(400).json({ success: false, message: 'Profile picture is required' });
      }

      const profilePicture = request.file.buffer;

      const updateProfilePictureQuery = `
        UPDATE user_detail
        SET profilePicture = ?
        WHERE email = ?
      `;

      const result: any = await execute(updateProfilePictureQuery, [profilePicture, email]);

      if (result.affectedRows === 0) {
        return response.status(404).json({ success: false, message: 'User not found' });
      }

      response.status(200).json({ success: true, message: 'Profile picture updated successfully' });
    } catch (error: any) {
      response.status(500).json({ success: false, message: error.message });
    }
  }
};
