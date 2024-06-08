import { GetAdminDashboardDataController } from '../../Controllers/GetAdminDashboardDataController/GetAdminDashboardDataController';
import express from 'express';

const router = express.Router();

router.get('/getAdminDashboardData', GetAdminDashboardDataController.GetUserAdminData);
router.get('/getUserInvestmentDetails/:email', GetAdminDashboardDataController.getUserInvestmentDetail);

export { router as AdminDashboard };
