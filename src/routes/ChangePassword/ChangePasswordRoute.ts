import { ChangePasswordController } from "../../Controllers/ChangePasswordController/ChangePasswordController";
import express from "express";

const router=express.Router()

router.post('/handleUpdatePassword',ChangePasswordController.updatePassword)

export {router as PasswordRoutes}