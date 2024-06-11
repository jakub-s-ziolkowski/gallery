
import express from 'express';

import { getImages } from '../controllers/imageController.js';

const router = express.Router();

router.get('/', getImages);
router.get('/:gallery', getImages);

export default router;
