import express from 'express';
import { GetCourseDataController } from '../../Controllers/GetCourseDataController/GetCourseDataController';
const router = express.Router();

router.get('/getCourseData', GetCourseDataController.GetCourseData);

export { router as CourseRoutes };