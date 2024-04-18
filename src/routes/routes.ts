import express from 'express';
import { UserRoutes } from './User/UserRoute';

import { AuthRoutes } from './Auth/AuthRoute';


const router = express.Router();

router.use('/user', UserRoutes);
router.use('/auth', AuthRoutes);

export default router;
