
import Image from '../models/Image.js';

export const addImage = async (req, res) => {

    try {

    }

    catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};

export const getImages = async (req, res) => {

    const gallery = req.params.gallery;

    try {

        const images = await Image.find(gallery ? { gallery: gallery } : {});
        res.send(images);
    }

    catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};
