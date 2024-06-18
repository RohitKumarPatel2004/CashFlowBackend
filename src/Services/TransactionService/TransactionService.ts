import { execute } from '../../Config/Database/QueryWrapperMysql';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const TransactionService = {
  handleTransaction: async (request: Request, response?: Response): Promise<any> => {
    try {
      const { email, type, amount, password } = request.body;

      if (!email || !type || typeof amount !== 'number' || (type === 'withdrawal' && !password)) {
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
      let newBalance = parseInt(balance, 10);

      // Handle transaction based on type
      switch (type) {
        case 'deposit':
        case 'daily_profit':
        case 'referral_award':
        case 'rejected_Amount':
          newBalance += amount;
          break;
        case 'withdrawal':
          // Verify password for withdrawal
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
          break;
        case 'investment':
          if (newBalance >= amount) {
            newBalance -= amount;
          } else {
            if (response) {
              response.status(400).json({ success: false, message: 'Insufficient balance' });
            }
            return { success: false, message: 'Insufficient balance' };
          }
          break;
        default:
          if (response) {
            response.status(400).json({ success: false, message: 'Invalid transaction type' });
          }
          return { success: false, message: 'Invalid transaction type' };
      }

      // Update balance in user_detail table
      const updateBalanceQuery = 'UPDATE user_detail SET balance = ? WHERE unique_id = ?';
      await execute(updateBalanceQuery, [newBalance, unique_id]);

      // Determine the transaction status
      const status = type === 'withdrawal' ? 'pending' : 'success';

      // Generate a unique transaction ID
      const transactionId = uuidv4();

      const recordTransactionQuery = 'INSERT INTO transactions (unique_id, transaction_id, email, amount, type, status) VALUES (?, ?, ?, ?, ?, ?)';
      await execute(recordTransactionQuery, [unique_id, transactionId, email, amount.toFixed(2), type, status]);

      if(type==='withdrawal'){
        const recordTransactionQuery = 'INSERT INTO withdrawApprove (unique_id, transaction_id, email, amount, type, status) VALUES (?, ?, ?, ?, ?, ?)';
        await execute(recordTransactionQuery, [unique_id, transactionId, email, amount.toFixed(2), type, status]);
  

      }

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
