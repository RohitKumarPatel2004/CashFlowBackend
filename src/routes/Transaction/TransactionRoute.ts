import { TransactionHistoryController } from '../../Controllers/TransactionHistoryController/TransactionHistoryController';
import { TransactionController } from '../../Controllers/TransactionController/TransactionController';
import express from 'express';


const router = express.Router();


router.post('/handleTransaction', TransactionController.UpdateBalance);
router.post('/handleTransactionHistory',TransactionHistoryController.transactionHistory)

export { router as TransactionRoutes };

