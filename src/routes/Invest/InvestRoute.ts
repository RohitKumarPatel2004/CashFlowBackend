import { GetInvestmentController } from '../../Controllers/GetInvestmentController/GetInvestmentController';
import { PostInvestmentController } from '../../Controllers/PostInvestmentController/PostInvestmentController';
import express from 'express';

const router = express.Router();

router.post('/postinvest', PostInvestmentController.PostInvestData);
router.get('/getinvest', GetInvestmentController.GetInvestData);



export { router as InvestRoutes };
