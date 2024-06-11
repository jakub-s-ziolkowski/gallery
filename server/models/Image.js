
import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({

    owner: {
        type: String,
        required: true,
    },
    gallery: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
});

const Image = mongoose.model('Image', imageSchema);

export default Image;
