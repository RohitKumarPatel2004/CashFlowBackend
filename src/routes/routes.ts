import express from 'express';
import { UserRoutes } from './User/UserRoute';

import { AuthRoutes } from './Auth/AuthRoute';
import { CourseRoutes } from './course/CourseRoute';
import { QuizRoute } from './Quiz/QuizRoute';
import { CourseById } from './CourseById/CourseById';


const router = express.Router();

router.use('/course', CourseRoutes);
router.use('/courseById', CourseById);
router.use('/user', UserRoutes);
router.use('/auth', AuthRoutes);
router.use('/quiz',QuizRoute);

export default router;
