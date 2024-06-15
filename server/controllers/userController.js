
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const SECRET_KEY = 'secret';

export const createUser = async (req, res) => {

    try {

        const username = req.body['username'];
        const password = req.body['new-password'];

        const exists = await User.findOne({ username: username });

        if (exists) throw Error('User already exists' );

        const user = new User({ username, password });

        await user.save();
        res.status(201).send(user);
    }

    catch (error) { res.status(400).json(error.message); }
};

export const authUser = async (req, res) => {

    const username = req.body['username'];
    const password = req.body['current-password'];

    try {

        const user = await User.findOne({ username: username });

        if (!user) throw Error('User not found');

        if (user.password === password) {

            jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' }, (error, token) => {

                if (error) throw Error('Token error');

                else res.status(200).send({ token });
            });
        }

        else throw Error('Invalid password' );
    }

    catch (error) { res.status(400).json(error.message); }
};

export const getToken = async (req, res) => {

    const header = req.headers['authorization'];

    try {

        if (!header) throw Error('Invalid token');

        const token = header.split(' ')[1];

        const decoded = jwt.verify(token, SECRET_KEY);

        res.json({ user: decoded });
    }

    catch (error) { res.status(400).json(error.message); }
};
