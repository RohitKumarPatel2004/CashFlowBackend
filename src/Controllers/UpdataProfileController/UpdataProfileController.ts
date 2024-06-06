import { UpdateProfileService } from '../../Services/UpdateProfileService/UpdateProfileService';
import { NextFunction, Request, Response } from 'express';

export const UpdateProfileController = {
  UpdateProfile: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await UpdateProfileService.updateProfile(request, response);
    } catch (error) {
      next(error);
    }
  }
};
