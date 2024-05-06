import express from 'express';
import { PostQuizDataController } from '../../Controllers/PostQuizDataController/PostQuizDataController';
import { GetQuizDataController } from '../../Controllers/GetQuizDataController/GetQuizDataController';

const router = express.Router();

router.post('/postquestion', PostQuizDataController.PostQuizData);
router.get("/getquizquestion", GetQuizDataController.GetQuizData)

export { router as QuizRoute };
