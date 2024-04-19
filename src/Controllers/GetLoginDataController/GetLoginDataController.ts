import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
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
  VerifyToken: (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization?.split(" ")[1];
    if (!token) return response.status(401).send("Access Denied");

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
      if (err) return response.status(401).send("Invalid Token");
      request.body.email = decoded.email;
      next();
    });
  }

};
