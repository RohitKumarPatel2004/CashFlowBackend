import { execute } from '../../Config/Database/QueryWrapperMysql';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const TransactionService = {
  handleTransaction: async (request: Request, response?: Response): Promise<any> => {
    try {
      const { email, type, amount, password } = request.body;

      if (!email || !type || !amount || typeof email !== 'string' || typeof type !== 'string' || typeof amount !== 'number' || (type === 'withdrawal' && !password)) {
        if (response) {
          response.status(400).json({ success: false, message: 'Invalid request data' });
        }
        return { success: false, message: 'Invalid request data' };
      }

      // Fetch unique_id, current balance, and stored password from user_detail table
      const userQuery = 'SELECT unique_id, balance, password FROM user_detail WHERE email = ?';
      const [user]: any = await execute(userQuery, [email]);

      if (!user) {
        if (response) {
          response.status(404).json({ success: false, message: 'User not found' });
        }
        return { success: false, message: 'User not found' };
      }

      const { unique_id, balance, password: storedPassword } = user;

      // Check the transaction type and update balance accordingly
      let newBalance = parseInt(balance, 10);
      if (type === 'deposit' || type === 'daily_profit' || type === 'referral_award') {
        newBalance += amount;
      } else if (type === 'withdrawal') {
        // Verify password
        const passwordMatch = await bcrypt.compare(password, storedPassword);
        if (!passwordMatch) {
          if (response) {
            response.status(400).json({ success: false, message: 'Password does not match' });
          }
          return { success: false, message: 'Password does not match' };
        }
        if (newBalance >= amount) {
          newBalance -= amount;
        } else {
          if (response) {
            response.status(400).json({ success: false, message: 'Insufficient balance' });
          }
          return { success: false, message: 'Insufficient balance' };
        }
      } else if (type === 'investment') {
        if (newBalance >= amount) {
          newBalance -= amount;
        } else {
          if (response) {
            response.status(400).json({ success: false, message: 'Insufficient balance' });
          }
          return { success: false, message: 'Insufficient balance' };
        }
      } else {
        if (response) {
          response.status(400).json({ success: false, message: 'Invalid transaction type' });
        }
        return { success: false, message: 'Invalid transaction type' };
      }

      // Update balance in user_detail table
      const updateBalanceQuery = 'UPDATE user_detail SET balance = ? WHERE unique_id = ?';
      await execute(updateBalanceQuery, [newBalance.toString(), unique_id]);

      // Record the transaction in transactions table
      const recordTransactionQuery = 'INSERT INTO transactions (unique_id, email, amount, type) VALUES (?, ?, ?, ?)';
      await execute(recordTransactionQuery, [unique_id, email, amount, type]);

      if (response) {
        response.status(200).json({ success: true, message: 'Transaction successful', newBalance });
      }
      return { success: true, message: 'Transaction successful', newBalance };
    } catch (error: any) {
      if (response) {
        response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
      }
      return { success: false, message: 'An error occurred', error: error.message };
    }
  }
};
