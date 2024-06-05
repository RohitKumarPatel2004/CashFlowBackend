import { ChangePasswordService } from "../../Services/ChangePasswordService/ChangePasswordService";
import { NextFunction,Request,Response } from "express";


export const ChangePasswordController={
    updatePassword:async (request:Request ,response:Response ,next :NextFunction)=>{
        try {

            await ChangePasswordService.newPassWord(request,response)
            
        } catch (error) {
            next(error)
            
        }
    }
}