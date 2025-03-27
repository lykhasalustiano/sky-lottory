const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MySQL Connection Pool
const db = mysql.createPool({
    host: '127.0.0.1',    
    user: 'root',      
    password: '',         
    database: 'lychottery', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    let connection;
    try {
        connection = await db.getConnection();  
        const [users] = await connection.execute(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const user = users[0]; 
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials." });
        }

        res.status(200).json({ message: "Login successful!", user });

    } catch (error) {
        console.error("❌ Error logging in:", error);
        res.status(500).json({ error: "Internal server error." });
    } finally {
        if (connection) connection.release(); 
    }
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    let connection;
    try {
        connection = await db.getConnection();

        const [existingUsers] = await connection.execute(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Username or Email already exists.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await connection.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        res.status(201).json({ message: 'Signup successful!' });

    } catch (error) {
        console.error('❌ Signup Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (connection) connection.release(); 
    }
});

// // Game Data
// let gameData = {
//     timer: 300, 
//     potMoney: 10000, 
//     winningNumbers: [], 
// };

// // API: Fetch Game Data
// app.get("/game-data", (req, res) => {
//     res.json(gameData);
// });

// // WebSocket Connection for Real-Time Updates
// wss.on("connection", (ws) => {
//     console.log("New WebSocket connection established.");
    
//     // Send current game data to new clients
//     ws.send(JSON.stringify(gameData));

//     ws.on("message", (message) => {
//         try {
//             const data = JSON.parse(message);
//             if (data.action === "bet") {
//                 gameData.potMoney += data.amount; 
//                 broadcast(gameData);
//             }
//         } catch (error) {
//             console.error("Error processing message:", error);
//         }
//     });

//     ws.on("close", () => {
//         console.log("WebSocket connection closed.");
//     });
// });

// // Broadcast function to update all clients
// function broadcast(data) {
//     wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(JSON.stringify(data));
//         }
//     });
// }

// // Timer update every second
// setInterval(() => {
//     if (gameData.timer > 0) {
//         gameData.timer--;
//         broadcast(gameData);
//     } else {
//         generateWinningNumbers();
//     }
// }, 1000);

// // Function to generate winning numbers
// function generateWinningNumbers() {
//     gameData.winningNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1);
//     gameData.timer = 300; // Reset timer for next round
//     broadcast(gameData);
// }


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
