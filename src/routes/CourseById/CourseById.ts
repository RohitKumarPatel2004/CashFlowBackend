import express from 'express';
import { GetCourseDataByIdController } from '../../Controllers/GetCourseDataByIdController/GetCourseDataByIdController';

const router = express.Router();

router.get('/course/:id', GetCourseDataByIdController.GetCourseById);

export { router as CourseById };