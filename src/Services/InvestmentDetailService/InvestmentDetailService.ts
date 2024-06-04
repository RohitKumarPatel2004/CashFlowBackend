import { execute } from "../../Config/Database/QueryWrapperMysql";
import { Request, Response } from "express";

export const InvestmentDetailService = {
  addInvestmentDetails: async (request: Request, response: Response) => {
    try {
      const {email , planName, price, dailyProfit, totalRevenue, days } = request.body;
      
      if (!email || !planName || !price || !dailyProfit || !totalRevenue || !days) {
        response.status(400).json({ success: false, message: "Invalid request data" });
        return;
      }

      // Insert new investment details into the investmentDetails table
      const insertInvestmentQuery = `
        INSERT INTO investmentDetails (email,planName, price, dailyProfit, totalRevenue, days)
        VALUES (?, ?, ?, ?, ?,?)
      `;
      await execute(insertInvestmentQuery, [email ,planName, price, dailyProfit, totalRevenue, days]);

      response.status(200).json({ success: true, message: "Investment details added successfully" });
    } catch (error: any) {
      response.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
  },

  decrementDays: async () => {
    try {
      // Update all investment plans by decrementing the 'days' column where days are greater than 0
      const decrementDaysQuery = `
        UPDATE investmentDetails
        SET days = days - 1
        WHERE days > 0
      `;
      await execute(decrementDaysQuery);

      console.log("Days decremented successfully.");
    } catch (error: any) {
      console.error("An error occurred while decrementing days:", error.message);
    }
  }

  
};
