import { NextFunction, Request, Response } from 'express';
import {GetSigninDataService} from '../../Services/GetSigninDataService/GetSigninDataService'

export const GetSigninDataServices = {
  GetPanelistData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await GetSigninDataService.Login(request, response);
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
