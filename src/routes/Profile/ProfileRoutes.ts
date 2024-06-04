import express from 'express';
import { GetProfileController } from '../../Controllers/GetProfileController/GetProfileController';
import { UpdateProfileController } from '../../Controllers/UpdataProfileController/UpdataProfileController';
// import { UpdateProfilePicController } from '../../Controllers/UpdataProfileController/UpdateProfilePicController';
import multer from 'multer';

const router = express.Router();
const upload = multer();

router.post('/getprofile', GetProfileController.GetUserData);
router.post('/updatelocation', UpdateProfileController.UpdateLocation);
// router.post('/updateprofilepicture', upload.single('profilePicture'), UpdateProfilePicController.UpdatePic);

export { router as ProfileRoutes };
