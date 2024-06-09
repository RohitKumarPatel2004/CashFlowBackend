import express from 'express';
import { PendingWithdrawalcontroller } from '../../Controllers/TransactionController/PendingWithdrawalcontroller';
const router = express.Router();

router.get('/pendingWithdrawals', PendingWithdrawalcontroller.getPendingWithdrawals);
router.post('/approveWithdrawal', PendingWithdrawalcontroller.approveWithdrawal);
router.post('/rejectWithdrawal', PendingWithdrawalcontroller.rejectWithdrawal);




export { router as approveWithdrawalRoutes };

