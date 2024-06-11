
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const SECRET_KEY = 'secret';

export const createUser = async (req, res) => {

    try {

        if (req.body['new-password'] !== req.body['repeat-new-password'])
            throw Error({ code: 401, message: 'Passwords doesnt match' });

        const username = req.body['username'];
        const password = req.body['new-password'];

        const exists = await User.findOne({ username: username });

        if (exists) throw Error({ code: 400, message: 'User already exists' });

        const user = new User({ username, password });

        await user.save();
        res.status(201).send();

    } catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};

export const authUser = async (req, res) => {

    const username = req.body['username'];
    const password = req.body['current-password'];

    try {

        const user = await User.findOne({ username: username });

        if (!user) throw Error({ code: 404, message: 'User not found' });

        if (user.password === password) {

            jwt.sign({ user }, SECRET_KEY, { expiresIn: '1h' }, (error, token) => {

                if (error) throw Error({ code: 500, message: 'Token error' });

                else res.status(200).send({ token });
            });
        }

        else throw Error({ code: 401, message: 'Invalid password' });
    }

    catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};

export const getToken = async (req, res) => {

    const token = req.headers['authorization'];

    try {

        if (!token) throw Error({ code: 401, message: 'Invalid token' });

        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ user: decoded });
    }

    catch (error) { res.status(error.code ? error.code : 400).send(error.message); }
};
