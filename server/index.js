
'use strict';

import mongoose from 'mongoose';
import express from 'express';
import path from 'path';

import galleryRoutes from './routes/galleryRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

const port = 3000;
const dirname = path.resolve()

mongoose.connect('mongodb://localhost:27017/GalleryDB')
    .then(() => console.log('MongoDB connected'));

app.use(express.static(path.join(dirname, '../client/build/')))

app.use(express.json());

app.use('/users', userRoutes);
app.use('/images', imageRoutes);
app.use('/galleries', galleryRoutes);

app.get('*', (req, res) => res.sendFile(path.join(dirname, '../client/build', 'index.html')));

app.listen(port, () => console.log(`Listening on port ${port}`));
