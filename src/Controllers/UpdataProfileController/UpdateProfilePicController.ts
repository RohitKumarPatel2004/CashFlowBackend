import { UpdateProfileService } from '../../Services/UpdateProfileService/UpdateProfileService';
import { NextFunction, Request, Response } from 'express';

export const UpdateProfilePicController = {
  UpdatePic: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await UpdateProfileService.updateProfilePicture(request, response);
    } catch (error) {
      next(error);
    }
  }
};
