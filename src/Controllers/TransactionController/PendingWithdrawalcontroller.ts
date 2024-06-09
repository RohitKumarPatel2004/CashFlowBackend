import { PendingWithdrawal } from '../../Services/TransactionService/PendingWithdrawal';
import { NextFunction, Request, Response } from 'express';

export const PendingWithdrawalcontroller = {
  getPendingWithdrawals: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await PendingWithdrawal.getPendingWithdrawals(request, response);
    } catch (error) {
      next(error);
    }
  },
  approveWithdrawal: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await PendingWithdrawal.approveWithdrawal(request, response);
    } catch (error) {
      next(error);
    }
  },
  rejectWithdrawal: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await PendingWithdrawal.rejectWithdrawal(request, response);
    } catch (error) {
      next(error);
    }
  }
};
