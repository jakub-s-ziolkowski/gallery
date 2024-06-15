
import multer from 'multer';
import express from 'express';

import { getImages, uploadImage, deleteImage } from '../controllers/imageController.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 50 * 1024 * 1024 } });

router.get('/', getImages);
router.get('/:gallery', getImages);
router.post('/', upload.single('file'), uploadImage);
router.post('/:', getImages);
router.delete('/', deleteImage);

export default router;
