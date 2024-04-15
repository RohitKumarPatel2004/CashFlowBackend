import express from 'express';
import { GetPanelistDataController } from '../../Controllers/GetPanelistDataController/GetPanelistDataController';
const router = express.Router();

router.get('/getMasterjiData', GetPanelistDataController.GetPanelistData);

export { router as UserRoutes };