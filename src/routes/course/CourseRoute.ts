import express from 'express';
import { GetCourseDataController } from '../../Controllers/GetCourseDataController/GetCourseDataController';
import { AddCourseDataController } from '../../Controllers/AddCourseDataController/AddCourseDataController';
const router = express.Router();

router.get('/getCourseData', GetCourseDataController.GetCourseData);
router.post('/addCourseData', AddCourseDataController.AddCourseData);

export { router as CourseRoutes };