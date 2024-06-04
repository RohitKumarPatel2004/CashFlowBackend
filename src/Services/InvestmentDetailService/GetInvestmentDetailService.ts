import { Request, Response } from "express";
import { execute } from "../../Config/Database/QueryWrapperMysql";

export const GetInvestmentDetailService = {
  getUserDetails: async (request: Request, response: Response) => {
    try {
      const { email } = request.body; 

      const getUserQuery = `
        SELECT 
        planName , 
        price ,
        dailyProfit ,
        totalRevenue, 
        days 
        FROM investmentdetails
        WHERE email = ?

      `;
      
      const userData: any = await execute(getUserQuery, [email]);
      
      if (userData.length === 0) {
        return response.status(404).json({ success: false, message: 'Investment not found' });
      }
      
      response.status(200).json({ success: true, userData: userData });
    } catch (error: any) {
      response.status(500).json({ success: false, message: error.message });
    }
  }
};
