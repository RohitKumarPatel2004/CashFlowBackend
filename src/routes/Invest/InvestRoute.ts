import { UpdateInvestmentTypeController } from '../../Controllers/PostInvestmentController/UpdateInvestmentTypeController';
import { GetInvestmentController } from '../../Controllers/GetInvestmentController/GetInvestmentController';
import { PostInvestmentController } from '../../Controllers/PostInvestmentController/PostInvestmentController';
import express from 'express';

const router = express.Router();

router.post('/postinvest', PostInvestmentController.PostInvestData);
router.post('/updateTypeCard',UpdateInvestmentTypeController.UpdateType)
router.get('/getinvest', GetInvestmentController.GetInvestData);



export { router as InvestRoutes };
