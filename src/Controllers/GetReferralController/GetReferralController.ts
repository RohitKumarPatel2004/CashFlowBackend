// src/controllers/GetReferralController.ts
import { Request, Response, NextFunction } from 'express';
import { GetReferralService } from '../../Services/GetReferralService/GetReferralService';

export const GetReferralController = {
  ReferralController: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await GetReferralService.getReferralDetails(request, response);
    } catch (error) {
      next(error);
    }
  }
};
