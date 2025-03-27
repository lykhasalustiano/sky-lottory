import express from 'express';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import db from '../config/db.js'; 

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try {
        const connection = await db.getConnection();
        const [user] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
        connection.release();

        if (user.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful!", user: user[0] });

    } catch (error) {
        console.error("❌ Error logging in:", error);
        res.status(500).json({ error: "An error occurred while logging in." });
    }
});

export default router;
