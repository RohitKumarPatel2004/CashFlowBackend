import express from 'express';
import { AuthRoutes } from './Auth/AuthRoute';
import { InvestRoutes } from './Invest/InvestRoute';
import { ProfileRoutes } from './Profile/ProfileRoutes';
import { TransactionRoutes } from './Transaction/TransactionRoute';
import { InvestmentRoutes } from './Investment/InvestmentRoutes';


const router = express.Router();

router.use('/auth', AuthRoutes);
router.use('/invest', InvestRoutes);
router.use('/profile', ProfileRoutes);
router.use('/transaction',TransactionRoutes);
router.use('/investment',InvestmentRoutes);



export default router;
