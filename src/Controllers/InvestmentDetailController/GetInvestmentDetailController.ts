import { Request, Response, NextFunction } from 'express';
import { GetInvestmentDetailService } from '../../Services/InvestmentDetailService/GetInvestmentDetailService';

export const GetInvestmentDetailController = {
    getInvestmentDetails: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await GetInvestmentDetailService.getUserDetails(request, response);
    } catch (error) {
      next(error);
    }
  }
};
