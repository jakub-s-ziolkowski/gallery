
import express from 'express';

import { createGallery, getGalleries, removeGallery } from '../controllers/galleryController.js';

const router = express.Router();

router.post('/', createGallery);
router.get('/', getGalleries);
router.get('/:username', getGalleries);
router.delete('/:name', removeGallery);

export default router;
