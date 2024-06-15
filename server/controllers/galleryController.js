
import Gallery from '../models/Gallery.js';
import Image from '../models/Image.js';

export const createGallery = async (req, res) => {

    const { owner, name } = req.body;

    try {

        const exists = await Gallery.findOne({ name: name });

        if (exists) throw Error('Gallery already exists')

        const gallery = new Gallery({ owner, name });

        await gallery.save();
        res.status(201).send();
    }

    catch (error) { res.status(400).json(error.message); }
};

export const getGalleries = async (req, res) => {

    const username = req.params.username;

    try {

        const galleries = await Gallery.find(username ? { owner: username } : {});
        res.send(galleries);
    }

    catch (error) { res.status(400).json(error.message); }
};

export const removeGallery = async (req, res) => {

    const { name } = req.params;

    try {

        const image = await Image.findOne({ gallery: name });

        if (image) throw Error('Not empty gallery');

        const deletedGallery = await Gallery.findOneAndDelete({ name: name });

        if (!deletedGallery) throw Error('Gallery not found');

        res.status(200).send();
    }

    catch (error) { res.status(400).json(error.message); }
};
