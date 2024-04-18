import express from 'express';
import { SignupAuthDataController } from '../../Controllers/SignupAuthDataController/SignupAuthDataController';
const router = express.Router();

router.post('/signupAuthData', SignupAuthDataController.PostSignupAuthData);

export { router as AuthRoutes };