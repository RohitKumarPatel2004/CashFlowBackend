import { NextFunction, Request, Response } from 'express';
import {GetDataService} from '../../Services/GetPanelistDataService/GetDataService'

export const GetDataServices = {
  GetPanelistData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await GetDataService.Login(request, response);
      if(result){
        response.json(result);
      }else{
        response.status(404).json({error: "User Not found"});
      }
    }catch(e){
      next(e);
    }
  },
};
