import { NextFunction, Request, Response } from 'express';
import { GetPanelistDataService } from '../../Services/GetPanelistDataService/GetPanelistDataService';

export const GetPanelistDataController = {
  GetPanelistData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await GetPanelistDataService.GetPanelistData();
      response.json(result);
    } catch (e) {
      next(e);
    }
  },
};
