import { Request, Response } from "express";
import { execute } from "../../Config/Database/QueryWrapperMysql";

export const TransactionHistoryService = {
  handleTransactionHistory: async (request: Request, response: Response) => {
    try {
      const { email } = request.body;

      // Validate the request
      if (!email || typeof email !== "string") {
        return response.status(400).json({ success: false, message: 'Invalid email' });
      }

      // Query to fetch transaction history
      const query = `
        SELECT type, time, amount
        FROM transactions
        WHERE email = ?
        ORDER BY time DESC
      `;
      
      const transactionHistory: any = await execute(query, [email]);
      
      // Check if any transaction records are found
      if (transactionHistory.length === 0) {
        return response.status(404).json({ success: false, message: 'No transaction history found' });
      }
      
      // Respond with transaction history
      response.status(200).json({ success: true, transactions: transactionHistory });
    } catch (error: any) {
      // Handle any errors that occur during the process
      response.status(500).json({ success: false, message: 'An error occurred while retrieving transaction history', error: error.message });
    }
  }
};
