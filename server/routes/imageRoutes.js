
import express from 'express';

import { addImage, getImages } from '../controllers/imageController.js';

const router = express.Router();

router.post('/', addImage);
router.get('/', getImages);
router.get('/:gallery', getImages);

export default router;
