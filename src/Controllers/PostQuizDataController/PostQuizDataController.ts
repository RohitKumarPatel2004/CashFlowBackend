import { PostQuizDataService } from "../../Services/PostQuizDataService/PostQuizDataService";
import { Request, Response, NextFunction } from "express";

export const PostQuizDataController = {
    PostQuizData: async (request: Request, response: Response, next: NextFunction) => {
        try {
            await PostQuizDataService.PostQuizData(request, response, next);
        } catch (error) {
            response.status(500).json({ msg: "something went wrong!" });
        }
    }
};
