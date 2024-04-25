import express from 'express';
import { SignupAuthDataController } from '../../Controllers/SignupAuthDataController/SignupAuthDataController';
import {GetSigninDataServices} from '../../Controllers/GetLoginDataController/GetLoginDataController';
const router = express.Router();

router.post('/login', GetSigninDataServices.GetPanelistData)
router.post('/signupAuthData', SignupAuthDataController.PostSignupAuthData);


export { router as AuthRoutes };