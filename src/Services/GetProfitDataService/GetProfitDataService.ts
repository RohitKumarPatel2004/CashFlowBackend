import { execute } from '../../Config/Database/QueryWrapperMysql';
import { Request, Response } from 'express';

export const GetProfitDataService = {
  getTotalBalances: async (request: Request, response: Response) => {
    try {
      const { email } = request.body;

      const totalDailyProfitQuery = `
        SELECT COALESCE(SUM(amount), 0) as totalDailyProfit
        FROM transactions
        WHERE type = 'daily_profit' AND email = ?
      `;

      const totalInvestmentQuery = `
        SELECT COALESCE(SUM(amount), 0) as totalInvestment
        FROM transactions
        WHERE type = 'investment' AND email = ?
      `;

      const totalBalanceQuery = `
        SELECT balance
        FROM user_detail
        WHERE email = ?
      `;

      const [dailyProfitResult]: any = await execute(totalDailyProfitQuery, [email]);
      const [investmentResult]: any = await execute(totalInvestmentQuery, [email]);
      const [balanceResult]: any = await execute(totalBalanceQuery, [email]);

      const totalDailyProfit = parseInt(dailyProfitResult.totalDailyProfit) || 0;
      const totalInvestment = parseInt(investmentResult.totalInvestment) || 0;
      const totalBalance = parseInt(balanceResult.balance) || 0;

      response.status(200).json({ success: true, totalDailyProfit, totalInvestment, totalBalance });
    } catch (error: any) {
      response.status(500).json({ success: false, message: error.message });
    }
  },

  getOneDayProfit: async (request: Request, response: Response) => {
    try {
      const { email, date } = request.body;

      const oneDayProfitQuery = `
        SELECT COALESCE(SUM(amount), 0) as oneDayProfit
        FROM transactions
        WHERE type = 'daily_profit' AND email = ? AND DATE(time) = ?
      `;

      const [oneDayProfitResult]: any = await execute(oneDayProfitQuery, [email, date]);

      const oneDayProfit = parseInt(oneDayProfitResult.oneDayProfit) || 0;

      response.status(200).json({ success: true, oneDayProfit });
    } catch (error: any) {
      response.status(500).json({ success: false, message: error.message });
    }
  }
};
