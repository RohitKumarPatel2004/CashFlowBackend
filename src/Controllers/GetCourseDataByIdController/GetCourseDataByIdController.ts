import { Request, Response, NextFunction } from 'express';
import { GetCourseDataByIdService } from '../../Services/GetCourseDataByIdService/GetCourseDataByIdService';

export const GetCourseDataByIdController = {
  GetCourseById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const course = await GetCourseDataByIdService.GetCourseDataById(courseId);
      return res.json({
        "Success":"Success",
        "Data":course}); 
    } catch (error) {
      next(error);
    }
  }
};
