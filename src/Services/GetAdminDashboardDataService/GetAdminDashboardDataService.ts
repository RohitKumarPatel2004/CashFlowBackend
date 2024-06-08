import { Request, Response } from "express";
import { execute } from "../../Config/Database/QueryWrapperMysql";

export const GetAdminDashboardDataService = {
  getUserAndInvestmentCounts: async (request: Request, response: Response) => {
    try {
      // Query to count total number of users
      const userCountQuery = 'SELECT COUNT(*) AS userCount FROM user_detail';
      const userCountResult: any = await execute(userCountQuery);
      const totalUsers = userCountResult[0].userCount;

      // Query to count total number of users who have invested
      const investmentCountQuery = 'SELECT COUNT(DISTINCT email) AS investorCount FROM investmentdetails';
      const investmentCountResult: any = await execute(investmentCountQuery);
      const totalInvestors = investmentCountResult[0].investorCount;

      // Query to get all users
      const allUsersQuery = `
        SELECT 
          id, full_name, email, balance, number, location, referral_code,
          no_of_referral, referral_balance, joinedDate
        FROM user_detail`;
      
      const allUsersResult: any = await execute(allUsersQuery);

      // Calculate total investment and total profit for each user
      const usersWithInvestmentAndProfit = await Promise.all(allUsersResult.map(async (user: any) => {
        const totalInvestmentQuery = `
          SELECT COALESCE(SUM(amount), 0) as totalInvestment
          FROM transactions
          WHERE type = 'investment' AND email = ?
        `;
        const totalProfitQuery = `
          SELECT COALESCE(SUM(amount), 0) as totalDailyProfit
          FROM transactions
          WHERE type = 'daily_profit' AND email = ?
        `;

        const totalInvestmentResult: any = await execute(totalInvestmentQuery, [user.email]);
        const totalProfitResult: any = await execute(totalProfitQuery, [user.email]);

        const totalInvestment = totalInvestmentResult[0].totalInvestment;
        const totalDailyProfit = totalProfitResult[0].totalDailyProfit;

        return {
          ...user,
          totalInvestment,
          totalDailyProfit,
        };
      }));

      response.status(200).json({
        success: true,
        status: 200,
        data: {
          totalUsers,
          totalInvestors,
          allUsersResult: usersWithInvestmentAndProfit,
        }
      });
    } catch (error: any) {
      const errorMessage = 'Error during fetching user and investment counts: ' + error.message;
      response.status(500).json({
        success: false,
        status: 500,
        error: "Internal server error",
        errorMessage
      });
    }
  },

  getUserInvestmentDetails: async (request: Request, response: Response) => {
    try {
      const { email } = request.params;
      if (!email) {
        response.status(400).json({
          success: false,
          status: 400,
          error: "Bad Request",
          errorMessage: "Email parameter is required"
        });
        return;
      }

      const query = `
        SELECT planName, price, dailyProfit, totalRevenue, days, time
        FROM investmentdetails
        WHERE email = ?
      `;
      const investmentDetails = await execute(query, [email]);

      response.status(200).json({
        success: true,
        status: 200,
        data: investmentDetails,
      });
    } catch (error: any) {
      response.status(500).json({
        success: false,
        status: 500,
        error: "Internal server error",
        errorMessage: error.message,
      });
    }
  },
};
