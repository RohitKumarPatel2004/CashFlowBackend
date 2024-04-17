import express from 'express';
import { UserRoutes } from './User/UserRoute';
import { AuthRoute } from './AuthRoute/AuthRoute';



const router = express.Router();

router.use('/user', UserRoutes);
router.use('/auth', AuthRoute);

export default router;
