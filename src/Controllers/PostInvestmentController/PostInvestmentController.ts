import { PostInvestmentService } from '../../Services/PostInvestmentService/PostInvestmentService';
import { NextFunction, Request, Response } from 'express';


export const PostInvestmentController={
  PostInvestData:async(request:Request ,response:Response, next:NextFunction)=>{
    try {
     await PostInvestmentService.PostInvestment(request,response) 
    } catch (error) {
      next(error)
      
    }
  }
}









      
