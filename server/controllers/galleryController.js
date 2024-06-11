
import Gallery from '../models/Gallery.js';
import Image from '../models/Image.js';

export const createGallery = async (req, res) => {

    try {

        const { owner, name } = req.body;

        const gallery = new Gallery({ owner, name });

        await gallery.save();
        res.status(201).send();

    } catch (error) { res.status(400).send(error) }
};

export const getGalleries = async (req, res) => {

    const username = req.params.username;

    try {

        const galleries = await Gallery.find(username ? { owner: username } : {});
        res.send(galleries);

    } catch (error) { res.status(500).send(error) }
};

export const removeGallery = async (req, res) => {

    try {

        const { name } = req.params;

        const image = await Image.findOne({ gallery: name });

        if (image)
            return res.status(400).json({ message: 'Gallery not empty' });

        const deletedGallery = await Gallery.findOneAndDelete({ name: name });

        if (!deletedGallery)
            return res.status(404).json({ message: 'Gallery not found' });

        res.status(200).json({ message: 'Gallery deleted successfully' });

    } catch (error) { res.status(500).send(error) }
};
