import { Request, Response } from "express";
import { execute } from "../../Config/Database/QueryWrapperMysql";

export const PostInvestmentService = {
  PostInvestment: async (request: Request, response: Response) => {
    try {
      const { planName, price, dailyProfit, totalRevenue, days,type } = request.body;
      const query = 'INSERT INTO investment (planName, price, dailyProfit, totalRevenue, days,type) VALUES (?, ?, ?, ?, ?,?)';
      const bindValues = [planName, price, dailyProfit, totalRevenue, days,type];
      await execute(query, bindValues);
       response.status(201).json({
        success: true,
        status: 201,
        message: "Investment data has been successfully added to the database."
      });
    } catch (error: any) {
      const errorMessage = 'Error during posting investment data: ' + error.message;
     response.status(500).json({
        success: false,
        status: 500,
        error: "Internal server error",
        errorMessage
      });
    }
  },
};
