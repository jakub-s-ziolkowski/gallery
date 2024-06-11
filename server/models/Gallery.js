
import mongoose from 'mongoose';

const gallerySchema = mongoose.Schema({

    owner: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;
