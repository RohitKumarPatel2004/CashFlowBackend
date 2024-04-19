import express from 'express';
import { SignupAuthDataController } from '../../Controllers/SignupAuthDataController/SignupAuthDataController';
import {GetDataServices} from '../../Controllers/GetLoginDataController/GetLoginDataController';
const router = express.Router();

router.post('/login', GetDataServices.GetPanelistData)
router.post('/signupAuthData', SignupAuthDataController.PostSignupAuthData);


export { router as AuthRoutes };