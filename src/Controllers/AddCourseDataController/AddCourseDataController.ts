import { NextFunction, Request, Response } from 'express';
import {AddCourseDataService } from '../../Services/AddCourseDataService/AddCourseDataService';

export const AddCourseDataController = {
  AddCourseData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await AddCourseDataService.AddCourseData(request,response);
      return result
    } catch (e) {
      next(e);
    }
  },
};
