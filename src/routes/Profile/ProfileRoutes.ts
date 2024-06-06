import express from 'express';
import multer from 'multer';
import path from 'path';
import { UpdateProfileController } from '../../Controllers/UpdataProfileController/UpdataProfileController';
import { GetProfileController } from '../../Controllers/GetProfileController/GetProfileController';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.join(__dirname, '../../public/image')); // Using path.join for a relative directory
  },
  filename(req, file, callback) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    callback(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/update', upload.single('profilePicture'), UpdateProfileController.UpdateProfile);

router.post('/getprofile', GetProfileController.GetUserData);

export { router as ProfileRoutes };
