const database = require('../core/database');
const bcrypt = require('bcrypt'); // Fixed require issue

// Need to lahat sa backend file
async function getDatabaseConnection() {
    return await database();
}

document.addEventListener('DOMContentLoaded', async function () {
    const signupButton = document.querySelector('.signup-btn');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    signupButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('confirm-password').value.trim();

        // ✅ Dito muna bago mag-insert sa database, para ma-validate muna kung tama yung mga input
        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // ✅ Check kung may existing username na para hindi mag-duplicate
        const existingUser = users.find(user => user.username === username);
        if (existingUser) {
            alert('Username already exists. Please choose another one.');
            return;
        }

        try {
            // ✅ Tawagin lang to kapag pasado na sa validation
            await POSTUserData(username, email, password);
        } catch (error) {
            console.error('❌ Error inserting user data:', error);
            alert('An error occurred while creating your account.');
            return;
        }

        // ✅ Save new user locally para may local copy (pero backend na talaga ang naglalagay sa database)
        const newUser = { username, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // ✅ Mag Login ang bagong user automatically
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));

        alert('✅ Account created successfully! Redirecting to home page...');
        window.location.href = '../html/home.html';
    });
});

/**
 * ✅ Function for injecting data by SQL commands 👌
 * @param {*} username - Username ng user
 * @param {*} email - Email ng user
 * @param {*} password - Password ng user (iha-hash muna bago i-save)
 */
async function POSTUserData(username, email, password) {
    try {
        const connection = await getDatabaseConnection(); // ✅ Fixed async issue
        const saltRounds = 10;

        // ✅ Ineencrypt nyalang yung password, example: password = "password123", hashedPassword = "sd8fj20kd9e0kd9"
        // Hashed passwords mas secure kasi hindi directly readable ang password ng user 👌
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // ✅ Tawag dito placeholders 👌
        const query = `INSERT INTO user (username, email, password) VALUES (?, ?, ?)`;
        const values = [username, email, hashedPassword];

        // ✅ Ilalagay na sa database ⬆️
        const [result] = await connection.execute(query, values);
        
        return result;
    } catch (e) {
        // ✅ So pagnagka error yung nasa taas, lalabas tong error sa baba, para madali ma-identify kung saang part ng code nyo may issue
        console.error("❌ Error POSTUserData:", e.message);
        throw e;
    }
}
