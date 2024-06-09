import { execute } from '../../Config/Database/QueryWrapperMysql';
import { Request, Response } from 'express';
import { TransactionService } from './TransactionService';

export const PendingWithdrawal = {
  getPendingWithdrawals: async (request: Request, response: Response) => {
    try {
      const query = 'SELECT id, email, amount, time FROM transactions WHERE status = ? AND type = ?';
      const withdrawals = await execute(query, ['pending', 'withdrawal']);
      response.status(200).json({ success: true, withdrawals });
    } catch (error: any) {
      response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
  },

  approveWithdrawal: async (request: Request, response: Response) => {
    try {
      const { transactionId } = request.body;

      const updateQuery = 'UPDATE transactions SET status = ? WHERE id = ? AND type = ?';
      await execute(updateQuery, ['success', transactionId, 'withdrawal']);

      response.status(200).json({ success: true, message: 'Withdrawal approved' });
    } catch (error: any) {
      response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
  },

  rejectWithdrawal: async (request: Request, response: Response) => {
    try {
      const { transactionId } = request.body;

      // Fetch the withdrawal details
      const fetchQuery = 'SELECT email, amount FROM transactions WHERE id = ? AND type = ?';
      const withdrawal: any = await execute(fetchQuery, [transactionId, 'withdrawal']);

      if (withdrawal.length === 0) {
        response.status(404).json({ success: false, message: 'Withdrawal not found' });
        return;
      }

      const { email, amount } = withdrawal[0];

      // Start transaction
      await execute('START TRANSACTION');

      try {
        const updateQuery = 'UPDATE transactions SET status = ? WHERE id = ? AND type = ?';
        await execute(updateQuery, ['failed', transactionId, 'withdrawal']);

        // Add the withdrawal amount back to the user's main balance as rejected_Amount
        const transactionRequest = {
          body: {
            email,
            type: 'rejected_Amount',
            amount: parseInt(amount),
          }
        } as Request;

        // Properly mock the response object with correct type
        const transactionResponse = {
          status: function(statusCode: number) {
            return {
              json: function(body: any) {
                return { statusCode, body };
              }
            };
          }
        } as unknown as Response;

        const result = await TransactionService.handleTransaction(transactionRequest, transactionResponse);

        // Commit transaction
        await execute('COMMIT');
        response.status(200).json({ success: true, message: 'Withdrawal rejected and amount added back to balance' });
      } catch (error: any) {
        // Rollback transaction in case of error
        await execute('ROLLBACK');
        response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
      }
    } catch (error: any) {
      response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
  }
};
