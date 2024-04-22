import express from 'express';
import { UserRoutes } from './User/UserRoute';

import { AuthRoutes } from './Auth/AuthRoute';
import { CourseRoutes } from './course/CourseRoute';


const router = express.Router();

router.use('/course', CourseRoutes);
router.use('/user', UserRoutes);
router.use('/auth', AuthRoutes);

export default router;
