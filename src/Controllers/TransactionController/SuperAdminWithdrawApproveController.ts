import { AdminPendingWithdrawalService } from '../../Services/TransactionService/SuperAdminWithdrawApproveService';
import { NextFunction, Request, Response } from 'express';

export const AdminPendingWithdrawalcontroller = {
  getPendingWithdrawals: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await AdminPendingWithdrawalService.getPendingWithdrawals(request, response);
    } catch (error) {
      next(error);
    }
  },
  approveWithdrawal: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await AdminPendingWithdrawalService.approveWithdrawal(request, response);
    } catch (error) {
      next(error);
    }
  },
  rejectWithdrawal: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await AdminPendingWithdrawalService.rejectWithdrawal(request, response);
    } catch (error) {
      next(error);
    }
  }
};
