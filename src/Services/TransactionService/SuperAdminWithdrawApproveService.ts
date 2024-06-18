import { execute } from '../../Config/Database/QueryWrapperMysql';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { TransactionService } from './TransactionService';

export const AdminPendingWithdrawalService = {
  getPendingWithdrawals: async (request: Request, response: Response) => {
    try {
      const query = `
        SELECT w.id,w.transaction_id, w.email, w.amount, w.time 
        FROM withdrawApprove w
        JOIN transactions t ON w.transaction_id = t.transaction_id
        WHERE w.status = ? AND w.type = ? AND t.status = ? AND t.type = ?
      `;
      const withdrawals = await execute(query, ['success', 'withdrawal', 'pending', 'withdrawal']);
      response.status(200).json({ success: true, withdrawals });
    } catch (error: any) {
      response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
  },

  approveWithdrawal: async (request: Request, response: Response) => {
    try {
      const { transactionId } = request.body;

      const updateQuery = 'UPDATE withdrawApprove SET status = ? WHERE transaction_id = ? AND type = ?';
      await execute(updateQuery, ['success', transactionId, 'withdrawal']);

      const updateTransactionQuery = 'UPDATE transactions SET status = ? WHERE transaction_id = ? AND type = ?';
      await execute(updateTransactionQuery, ['success', transactionId, 'withdrawal']);

      response.status(200).json({ success: true, message: 'Withdrawal approved' });
    } catch (error: any) {
      response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
  },

  rejectWithdrawal: async (request: Request, response: Response) => {
    try {
      const { transactionId } = request.body;

      // Fetch the withdrawal details
      const fetchQuery = 'SELECT email, amount FROM withdrawApprove WHERE transaction_id = ? AND type = ?';
      const withdrawal: any = await execute(fetchQuery, [transactionId, 'withdrawal']);

      if (withdrawal.length === 0) {
        response.status(404).json({ success: false, message: 'Withdrawal not found' });
        return;
      }

      const { email, amount } = withdrawal[0];

      // Start transaction
      await execute('START TRANSACTION');

      try {
        const updateQuery = 'UPDATE withdrawApprove SET status = ? WHERE transaction_id = ? AND type = ?';
        await execute(updateQuery, ['failed', transactionId, 'withdrawal']);

        const updateTransactionQuery = 'UPDATE transactions SET status = ? WHERE transaction_id = ? AND type = ?';
        await execute(updateTransactionQuery, ['failed', transactionId, 'withdrawal']);

        // Add the withdrawal amount back to the user's main balance as rejected_Amount
        const transactionRequest = {
          body: {
            email,
            type: 'rejected_Amount',
            amount: parseInt(amount),
          }
        } as Request;

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

        if (!result.success) {
          throw new Error(result.message);
        }

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
