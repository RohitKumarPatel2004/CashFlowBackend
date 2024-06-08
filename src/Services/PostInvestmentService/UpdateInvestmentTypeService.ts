import { Request, Response } from "express";
import { execute } from "../../Config/Database/QueryWrapperMysql";

export const UpdateInvestmentTypeService = {
  UpdateInvestmentType: async (request: Request, response: Response) => {
    try {
      const { planName, type } = request.body;

      if (!planName || !type) {
        return response.status(400).json({
          success: false,
          status: 400,
          message: "Plan name and new type are required"
        });
      }

      const query = 'UPDATE investment SET type = ? WHERE planName = ?';
      const bindValues = [type, planName];
      const result:any = await execute(query, bindValues);

      if (result.affectedRows === 0) {
        return response.status(404).json({
          success: false,
          status: 404,
          message: `Investment plan ${planName} not found`
        });
      }

      response.status(200).json({
        success: true,
        status: 200,
        message: `Investment plan ${planName} has been successfully updated to type ${type}.`
      });
    } catch (error: any) {
      const errorMessage = 'Error during updating investment type: ' + error.message;
      response.status(500).json({
        success: false,
        status: 500,
        error: "Internal server error",
        errorMessage
      });
    }
  },
};
