const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const hashPassword = async (plainPassword) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};

const comparisonString = hashPassword("1234");

const login = async (req, res) => {
    const users = [
        { id: 1, username: 'admin', password: '$2b$10$eTVYTcIZxlr4qY0785IRhud7OKO5j./5UOeOX5oenWqIXhJAc6GEy' } // bcrypt hashed password
    ];

    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ error: 'Invalid21 username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '6h' });
    res.json({ token });
};

module.exports = { login }
