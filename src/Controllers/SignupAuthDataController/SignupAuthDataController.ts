import { NextFunction, Request, Response } from 'express';
import { PostSignupAuthDataService } from '../../Services/PostSignupAuthDataService/PostSignupAuthDataService';

export const SignupAuthDataController = {
  PostSignupAuthData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await PostSignupAuthDataService.PostSignupAuthData(request,response);
      return result;
    } catch (e) {
      next(e);
    }
  },
};
