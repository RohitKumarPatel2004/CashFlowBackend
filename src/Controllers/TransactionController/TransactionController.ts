
import { TransactionService } from '../../Services/TransactionService/TransactionService';
import { NextFunction, Request, Response } from 'express';

export const TransactionController = {
  UpdateBalance: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await TransactionService.handleTransaction(request, response);
    } catch (error) {
      next(error);
    }
  }
};
