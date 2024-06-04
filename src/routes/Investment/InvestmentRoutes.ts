import express from 'express';
import { InvestmentDetailController } from '../../Controllers/InvestmentDetailController/InvestmentDetailController';
import { GetInvestmentDetailController } from '../../Controllers/InvestmentDetailController/GetInvestmentDetailController';


const router = express.Router();


router.post('/handleGetInvestmentDetails',GetInvestmentDetailController.getInvestmentDetails );

router.post('/handleInvestmentDetails',InvestmentDetailController.PostInvestData );

export { router as InvestmentRoutes };

