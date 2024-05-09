import express from 'express';
import { SignupAuthDataController } from '../../Controllers/SignupAuthDataController/SignupAuthDataController';
import {GetSigninDataServices} from '../../Controllers/GetLoginDataController/GetLoginDataController';
import { validate } from '../../Middleware/ValidateSignupData/ValidateData';
import { userSchema } from '../../Middleware/ValidateSignupData/Schema/userSchema';
const router = express.Router();

router.post('/login', GetSigninDataServices.GetPanelistData)
router.post('/signupAuthData',validate(userSchema) ,SignupAuthDataController.PostSignupAuthData);


export { router as AuthRoutes };