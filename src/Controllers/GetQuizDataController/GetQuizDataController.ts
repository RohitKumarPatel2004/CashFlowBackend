import { Request ,Response } from "express"
import {GetQuizDataService} from "../../Services/GetQuizDataService/GetQuizDataService"

export const GetQuizDataController={
    GetQuizData:async(request:Request,response:Response)=>{

        try {
            await GetQuizDataService.GetQuizData(request,response)
            
        } catch (error) {

            response.status(500).json({msg:"something went wrong!"})
            
        }


    }
}