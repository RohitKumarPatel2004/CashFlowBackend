import { Request, Response, NextFunction } from 'express';
import { GetProfileService } from '../../Services/GetProfileService/GetProfileService';

export const GetProfileController = {
  GetUserData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await GetProfileService.getUser(request, response);
    } catch (error) {
      next(error);
    }
  }
};
