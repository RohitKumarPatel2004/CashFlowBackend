// src/routes/Referral/ReferralRoutes.js
import express from 'express';
import { GetReferralController } from '../../Controllers/GetReferralController/GetReferralController';

const router = express.Router();

router.post('/handleReferral', GetReferralController.ReferralController);

export { router as ReferralRoutes };
