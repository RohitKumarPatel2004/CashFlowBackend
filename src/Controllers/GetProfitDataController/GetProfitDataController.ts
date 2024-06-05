import { Request, Response, NextFunction } from 'express';
import { GetProfitDataService } from '../../Services/GetProfitDataService/GetProfitDataService';

export const GetProfitDataController = {
  GetProfitData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await GetProfitDataService.getTotalBalances(request, response);
    } catch (error) {
      next(error);
    }
  },

  OneGetProfitData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await GetProfitDataService.getOneDayProfit(request, response);
    } catch (error) {
      next(error);
    }
  }
};
