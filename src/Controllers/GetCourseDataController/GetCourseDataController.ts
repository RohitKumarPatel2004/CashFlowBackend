import { NextFunction, Request, Response } from 'express';
import { GetCourseDataService } from '../../Services/GetCourseDataService/GetCourseDataService';

export const GetCourseDataController = {
  GetCourseData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await GetCourseDataService.GetCourseData();
      response.json(result);
    } catch (e) {
      next(e);
    }
  },
};
