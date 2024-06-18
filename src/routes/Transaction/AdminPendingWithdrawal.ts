import express from 'express';
import { AdminPendingWithdrawalcontroller } from '../../Controllers/TransactionController/SuperAdminWithdrawApproveController';
const router = express.Router();

router.get('/pendingWithdrawals', AdminPendingWithdrawalcontroller.getPendingWithdrawals);
router.post('/approveWithdrawal', AdminPendingWithdrawalcontroller.approveWithdrawal);
router.post('/rejectWithdrawal', AdminPendingWithdrawalcontroller.rejectWithdrawal);




export { router as approveAdminWithdrawalRoutes };

