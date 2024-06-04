import { InvestmentDetailService } from '../../Services/InvestmentDetailService/InvestmentDetailService';
import { NextFunction, Request, Response } from 'express';


export const InvestmentDetailController={
  PostInvestData:async(request:Request ,response:Response, next:NextFunction)=>{
    try {
     await InvestmentDetailService.addInvestmentDetails(request,response) 
    } catch (error) {
      next(error)
      
    }
  }
}









      
