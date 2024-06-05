import express from 'express';
import { GetProfitDataController } from '../../Controllers/GetProfitDataController/GetProfitDataController';

const router = express.Router();

router.post('/handleProfit', GetProfitDataController.GetProfitData);
router.post('/handleOneProfit', GetProfitDataController.OneGetProfitData);

export { router as ProfitRoutes };
