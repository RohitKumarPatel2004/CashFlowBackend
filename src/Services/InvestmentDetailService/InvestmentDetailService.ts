import { execute } from '../../Config/Database/QueryWrapperMysql';
import { Request, Response } from 'express';
import { TransactionService } from '../TransactionService/TransactionService';

export const InvestmentDetailService = {
  addInvestmentDetails: async (request: Request, response: Response) => {
    try {
      const { email, planName, price, dailyProfit, totalRevenue, days } = request.body;

      if (!email || !planName || !price || !dailyProfit || !totalRevenue || !days) {
        response.status(400).json({ success: false, message: 'Invalid request data' });
        return;
      }

      const insertInvestmentQuery = `
        INSERT INTO investmentDetails (email, planName, price, dailyProfit, totalRevenue, days)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await execute(insertInvestmentQuery, [email, planName, price, dailyProfit, totalRevenue, days]);

      response.status(200).json({ success: true, message: 'Investment details added successfully' });
    } catch (error: any) {
      response.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
  },

  decrementDays: async () => {
    try {
      const fetchInvestmentsQuery = `
        SELECT id, email, dailyProfit
        FROM investmentDetails
        WHERE days > 0
      `;
      const investments: any = await execute(fetchInvestmentsQuery);

      for (const investment of investments) {
        const { id, email, dailyProfit } = investment;

        await execute('START TRANSACTION');

        try {
          const decrementDaysQuery = `
            UPDATE investmentDetails
            SET days = days - 1
            WHERE id = ?
          `;
          await execute(decrementDaysQuery, [id]);

          // Mock the request and response objects for TransactionService.handleTransaction
          const transactionRequest = {
            body: {
              email,
              type: 'daily_profit',
              amount: parseInt(dailyProfit),
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

          // if (result.statusCode !== 200) {
          //   throw new Error(`Transaction failed: ${result.body.message}`);
          // }

          await execute('COMMIT');
        } catch (error: any) {
          await execute('ROLLBACK');
          console.error('An error occurred while decrementing days and updating balances:', error.message);
        }
      }

      console.log('Days decremented and balances updated successfully.');
    } catch (error: any) {
      console.error('An error occurred while fetching investments:', error.message);
    }
  }
};
