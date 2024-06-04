import { GetInvestmentController } from '../../Controllers/GetInvestmentController/GetInvestmentController';
import { PostInvestmentController } from '../../Controllers/PostInvestmentController/PostInvestmentController';
import express from 'express';

const router = express.Router();

// Define the route for posting investment data
router.post('/postinvest', PostInvestmentController.PostInvestData);
router.get('/getinvest', GetInvestmentController.GetInvestData);


// Uncomment and define the route for getting investment data if needed
// import { GetInvestmentController } from '../../Controllers/GetInvestmentController/GetInvestmentController';

export { router as InvestRoutes };
