import express from 'express';
import {GetDataServices} from '../../Controllers/GetLoginDataController/GetLoginDataController';
const router = express.Router();

router.post('/login', GetDataServices.GetPanelistData)

export { router as AuthRoute };