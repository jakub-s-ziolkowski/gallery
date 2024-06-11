
import Image from '../models/Image.js';

export const addImage = async (req, res) => {

    try {

        // const user = new User(req, body);

        // await user.save();
        // res.status(201).send(user);

    } catch (error) { res.status(400).send(error) }
};

export const getImages = async (req, res) => {

    const gallery = req.params.gallery;

    try {

        const images = await Image.find(gallery ? { gallery: gallery } : {});
        res.send(images);

    } catch (error) { res.status(500).send(error) }
};
