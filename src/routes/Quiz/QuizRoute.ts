import { PostQuizDataController } from '../../Controllers/PostQuizDataController/PostQuizDataController';
import express from 'express';

const router = express.Router();


router.post('/postquestion', PostQuizDataController.PostQuizData);


export { router as QuizRoute };