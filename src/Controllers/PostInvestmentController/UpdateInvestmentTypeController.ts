import { UpdateInvestmentTypeService } from '../../Services/PostInvestmentService/UpdateInvestmentTypeService';
import { NextFunction, Request, Response } from 'express';


export const UpdateInvestmentTypeController={
  UpdateType:async(request:Request ,response:Response, next:NextFunction)=>{
    try {
     await UpdateInvestmentTypeService.UpdateInvestmentType(request,response) 
    } catch (error) {
      next(error)
      
    }
  }
}









      
