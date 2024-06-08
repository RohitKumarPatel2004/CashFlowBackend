// src/routes/index.js
import express from 'express';
import { AuthRoutes } from './Auth/AuthRoute';
import { InvestRoutes } from './Invest/InvestRoute';
import { ProfileRoutes } from './Profile/ProfileRoutes';
import { TransactionRoutes } from './Transaction/TransactionRoute';
import { InvestmentRoutes } from './Investment/InvestmentRoutes';
import { ProfitRoutes } from './Profit/ProfitRoutes';
import { ReferralRoutes } from './Referral/ReferralRoutes';
import { PasswordRoutes } from './ChangePassword/ChangePasswordRoute';
import { AdminDashboard } from './DashboardData/DashboardDataRoute';

const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/invest', InvestRoutes);
router.use('/profile', ProfileRoutes);
router.use('/transaction', TransactionRoutes);
router.use('/investment', InvestmentRoutes);
router.use('/profit', ProfitRoutes);
router.use('/referral', ReferralRoutes);
router.use('/changePassword',PasswordRoutes)
router.use('/adminDashboard',AdminDashboard)


export default router;
