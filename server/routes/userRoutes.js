
import express from 'express';

import { createUser, authUser, getToken } from '../controllers/userController.js';

const router = express.Router();

router.post('/sign-up', createUser);
router.post('/sign-in', authUser);
router.get('/auth', getToken);

export default router;
