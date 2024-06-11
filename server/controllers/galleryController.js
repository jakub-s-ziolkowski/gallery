
import Gallery from '../models/Gallery.js';
import Image from '../models/Image.js';

export const createGallery = async (req, res) => {

    const { owner, name } = req.body;

    try {

        const exists = await Gallery.findOne({ name: name });

        if (exists) throw Error({ code: 400, message: 'Gallery already exists' })

        const gallery = new Gallery({ owner, name });

        await gallery.save();
        res.status(201).send();
    }

    catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};

export const getGalleries = async (req, res) => {

    const username = req.params.username;

    try {

        const galleries = await Gallery.find(username ? { owner: username } : {});
        res.send(galleries);
    }

    catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};

export const removeGallery = async (req, res) => {

    const { name } = req.params;

    try {

        const image = await Image.findOne({ gallery: name });

        if (image) throw Error({ code: 400, message: 'Not empty gallery'});

        const deletedGallery = await Gallery.findOneAndDelete({ name: name });

        if (!deletedGallery) throw Error({ code: 404, message: 'Gallery not found'});

        res.status(200).send();
    }

    catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};
