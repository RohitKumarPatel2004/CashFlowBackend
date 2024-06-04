import { UpdateProfileService } from '../../Services/UpdateProfileService/UpdateProfileService';
import { NextFunction, Request, Response } from 'express';

export const UpdateProfileController = {
  UpdateLocation: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await UpdateProfileService.updateLocation(request, response);
    } catch (error) {
      next(error);
    }
  }
};
