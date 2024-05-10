import { NextFunction, Request, Response } from 'express';
import {GetSigninDataService} from '../../Services/GetSigninDataService/GetSigninDataService'

export const GetSigninDataController = {
  GetSigninData: async (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await GetSigninDataService.Login(request, response);
      if(result){
    return result;
      }else{
        return({error: "User Not found"});
      }
    }catch(e){
      next(e);
    }
  },
};
