import { TransactionHistoryService } from '../../Services/TransactionService/TransactionHistoryService';
import { NextFunction, Request, Response } from 'express';

export const TransactionHistoryController = {
  transactionHistory: async (request: Request, response: Response, next: NextFunction) => {
    try {
      await TransactionHistoryService.handleTransactionHistory(request, response);
    } catch (error) {
      next(error);
    }
  }
};
