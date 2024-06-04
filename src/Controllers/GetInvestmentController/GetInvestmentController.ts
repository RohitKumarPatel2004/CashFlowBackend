
import { NextFunction, Request, Response } from 'express';
import { GetInvestmentService } from "../../Services/GetInvestmentService/GetInvestmentService"

export const GetInvestmentController={
  GetInvestData:async(request:Request ,response:Response, next:NextFunction)=>{
    try {
      await GetInvestmentService.GetInvestment(request,response) 
    } catch (error) {
      next(error)
      
    }
  }
}









      
