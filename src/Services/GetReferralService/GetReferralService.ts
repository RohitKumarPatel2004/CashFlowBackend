import { execute } from '../../Config/Database/QueryWrapperMysql';
import { Request, Response } from 'express';
import { TransactionService } from '../TransactionService/TransactionService';

export const GetReferralService = {
  getReferralDetails: async (request: Request, response: Response): Promise<void> => {
    try {
      const { email } = request.body;

      const referralQuery = `
        SELECT referral_code, no_of_referral, balance, referral_balance, last_awarded_referrals
        FROM user_detail
        WHERE email = ?
      `;

      const [referralResult]: any = await execute(referralQuery, [email]);

      if (!referralResult) {
        response.status(404).json({ success: false, message: 'User not found' });
        return;
      }

      const { referral_code, no_of_referral, balance, referral_balance, last_awarded_referrals } = referralResult;

      const referralBonuses = [
        { requiredReferrals: 2, reward: 50 },
        { requiredReferrals: 4, reward: 150 },
        { requiredReferrals: 10, reward: 250 },
        { requiredReferrals: 15, reward: 350 },
        { requiredReferrals: 20, reward: 450 },
        { requiredReferrals: 21, reward: 550 },
        { requiredReferrals: 22, reward: 650 },
        { requiredReferrals: 23, reward: 750 },
      ];

      let totalAward = 0;
      referralBonuses.forEach(bonus => {
        if (no_of_referral >= bonus.requiredReferrals && last_awarded_referrals < bonus.requiredReferrals) {
          totalAward += bonus.reward;
        }
      });

      if (totalAward > 0) {
        const transactionResponse = await TransactionService.handleTransaction({
          body: {
            email,
            type: 'referral_award',
            amount: totalAward
          }
        } as Request);

        if (!transactionResponse.success) {
          response.status(500).json({ success: false, message: transactionResponse.message });
          return;
        }

        // Update referral_balance and last_awarded_referrals in user_detail table
        const newReferralBalance = referral_balance + totalAward;
        const updateReferralBalanceQuery = 'UPDATE user_detail SET referral_balance = ?, last_awarded_referrals = ? WHERE email = ?';
        await execute(updateReferralBalanceQuery, [newReferralBalance, no_of_referral, email]);

        response.status(200).json({
          success: true,
          referral: referral_code,
          no_of_referral,
          newBalance: transactionResponse.newBalance,
          newReferralBalance
        });
      } else {
        response.status(200).json({ success: true, referral: referral_code, no_of_referral, newReferralBalance: referral_balance });
      }
    } catch (error: any) {
      response.status(500).json({ success: false, message: error.message });
    }
  }
};
