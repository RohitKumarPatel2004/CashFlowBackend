import { Request, Response } from "express";
import { execute } from "../../Config/Database/QueryWrapperMysql";

export const GetInvestmentService = {
  GetInvestment: async (request: Request, response: Response) => {
    try {
      const query = 'SELECT * FROM investment';
      const result: any = await execute(query);

     response.status(200).json({
        success: true,
        status: 200,
        data: result,
        message: "Investment data has been successfully retrieved from the database."
      });
    } catch (error: any) {
      const errorMessage = 'Error during fetching investment data: ' + error.message;
       response.status(500).json({
        success: false,
        status: 500,
        error: "Internal server error",
        errorMessage
      });
    }
  },
};
