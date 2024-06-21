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

      // Query to get all users with "admin" or "superadmin" user types
      const allAdminDataQuery = `
        SELECT 
          id, full_name, email, balance, number, location, referral_code,
          no_of_referral, referral_balance, joinedDate, userType
        FROM user_detail
        WHERE userType IN ('admin', 'superadmin')
      `;
      const allAdminDataResult: any = await execute(allAdminDataQuery);

      // Query to get all users with "user" user type
      const allUsersQuery = `
        SELECT 
          id, full_name, email, balance, number, location, referral_code,
          no_of_referral, referral_balance, joinedDate, userType
        FROM user_detail
        WHERE userType IN ('user')
      `;
      const allUsersResult: any = await execute(allUsersQuery);

      // Function to calculate total investment and total profit for each user
      const calculateInvestmentAndProfit = async (users: any[]) => {
        return Promise.all(users.map(async (user: any) => {
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
      };

      // Calculate investment and profit for admin and regular users
      const adminsWithInvestmentAndProfit = await calculateInvestmentAndProfit(allAdminDataResult);
      const usersWithInvestmentAndProfit = await calculateInvestmentAndProfit(allUsersResult);

      response.status(200).json({
        success: true,
        status: 200,
        data: {
          totalUsers,
          totalInvestors,
          allAdminData: adminsWithInvestmentAndProfit,
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

  modifyUserType: async (request: Request, response: Response) => {
    try {
      const { email, userType } = request.body;
      if (!email || !userType) {
        response.status(400).json({
          success: false,
          status: 400,
          error: "Bad Request",
          errorMessage: "Email and userType parameters are required"
        });
        return;
      }

      const updateUserTypeQuery = `
        UPDATE user_detail
        SET userType = ?
        WHERE email = ?
      `;
      await execute(updateUserTypeQuery, [userType, email]);

      response.status(200).json({
        success: true,
        status: 200,
        message: "User type updated successfully",
      });
    } catch (error: any) {
      response.status(500).json({
        success: false,
        status: 500,
        error: "Internal server error",
        errorMessage: error.message,
      });
    }
  }
};
