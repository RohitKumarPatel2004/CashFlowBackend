import { execute } from "../../Config/Database/QueryWrapperMysql";
import { Request, Response } from "express";

export const InvestmentDetailService = {
  addInvestmentDetails: async (request: Request, response: Response) => {
    try {
      const { email, planName, price, dailyProfit, totalRevenue, days } = request.body;

      if (!email || !planName || !price || !dailyProfit || !totalRevenue || !days) {
        response.status(400).json({ success: false, message: "Invalid request data" });
        return;
      }

      const insertInvestmentQuery = `
        INSERT INTO investmentDetails (email, planName, price, dailyProfit, totalRevenue, days)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await execute(insertInvestmentQuery, [email, planName, price, dailyProfit, totalRevenue, days]);

      response.status(200).json({ success: true, message: "Investment details added successfully" });
    } catch (error: any) {
      response.status(500).json({ success: false, message: "An error occurred", error: error.message });
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

          const userQuery = 'SELECT unique_id, balance FROM user_detail WHERE email = ?';
          const [user]: any = await execute(userQuery, [email]);

          if (user) {
            const { unique_id, balance } = user;
            const newBalance = (parseInt(balance) + parseInt(dailyProfit)).toString();

            const updateBalanceQuery = 'UPDATE user_detail SET balance = ? WHERE unique_id = ?';
            await execute(updateBalanceQuery, [newBalance, unique_id]);

            const recordTransactionQuery = 'INSERT INTO transactions (unique_id, email, amount, type) VALUES (?, ?, ?, ?)';
            await execute(recordTransactionQuery, [unique_id, email, dailyProfit, 'daily_profit']);
          }

          await execute('COMMIT');
        } catch (error: any) {
          await execute('ROLLBACK');
          console.error("An error occurred while decrementing days and updating balances:", error.message);
        }
      }

      console.log("Days decremented and balances updated successfully.");
    } catch (error: any) {
      console.error("An error occurred while fetching investments:", error.message);
    }
  }
};
