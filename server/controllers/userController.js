
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const SECRET_KEY = 'secret';

export const createUser = async (req, res) => {

    try {

        if (req.body['new-password'] !== req.body['repeat-new-password'])
            throw Error('Pass diff')

        const username = req.body['username'];
        const password = req.body['new-password'];

        const user = new User({ username, password });

        await user.save();
        res.status(201).send();

    } catch (error) { res.status(400).send(error) }
};

export const authUser = async (req, res) => {

    const username = req.body['username'];
    const password = req.body['current-password'];

    const user = await User.findOne({ username: username });

    if (!user) return res.status(404).send({ message: 'User not found' });

    if (user.password === password) {

        jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' }, (error, token) => {

            if (error) return res.status(404).send({ message: 'Token error' });

            else res.status(200).send({ token });
        });
    }

    else return res.status(401).send({ message: 'Invalid password' });

};

export const getToken = async (req, res) => {

    const token = req.headers['authorization'];

    if (!token) return res.status(401);

    try {

        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ user: decoded });
    }

    catch { res.status(401); }
};
