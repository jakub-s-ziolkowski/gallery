
import Image from '../models/Image.js';

export const getImages = async (req, res) => {

    const gallery = req.params.gallery;

    try {

        const images = await Image.find(gallery ? { gallery: gallery } : {});
        res.send(images);
    }

    catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};

export const uploadImage = async (req, res) => {

    const owner = req.body.owner;
    const gallery = req.body.gallery;

    try {

        if (req.file) {

            const source = 'data:' + req.file.mimetype + ';base64,' + req.file.buffer.toString('base64');
            const description = req.file.originalname.split('.').slice(0, -1).join('.');

            const image = new Image({ owner, gallery, source, description });

            await image.save();

            res.status(200).send();
        }

        else new Error('Image not found');
    }

    catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};

export const deleteImage = async (req, res) => {

    const gallery = req.body.gallery;
    const source = req.body.source;
    const description = req.body.description;

    try {

        console.log(source, gallery, description)

        const deletedImage = await Image.findOneAndDelete({ gallery: gallery, source: source, description: description });

        if (!deletedImage) throw Error('Image not found');

        res.status(200).send();
    }

    catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};
