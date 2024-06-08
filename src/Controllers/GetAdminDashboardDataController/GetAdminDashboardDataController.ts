import { Request, Response, NextFunction } from 'express';
import { GetAdminDashboardDataService } from '../../Services/GetAdminDashboardDataService/GetAdminDashboardDataService';

export const GetAdminDashboardDataController = {
  GetUserAdminData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await GetAdminDashboardDataService.getUserAndInvestmentCounts(request, response);
    } catch (error) {
      next(error);
    }
  },
  getUserInvestmentDetail: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await GetAdminDashboardDataService.getUserInvestmentDetails(request, response);
    } catch (error) {
      next(error);
    }
  }
};
