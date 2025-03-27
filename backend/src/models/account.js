import { connection } from "../core/database.js";
import { encryptPassword } from "../utils/hash.js";

class Account {
    /**
     * Account Model for user creation and signin
     */
    constructor() {
        this.db = connection;
    }

    /**
     * Create user
     * @param {*} username 
     * @param {*} email 
     * @param {*} password 
     * @returns 
     */
    async signUp(username, email, password) {

        console.log(username, email, password);

        try {
            const [results,] = await this.db.execute(
                `INSERT INTO users(username, password, email, user_money) VALUES (?, ?, ?, ?)`,
                [username, encryptPassword(password), email, 1000]
            );

            return results;
        } catch(err) {
            console.error('Models Error: account -> signUp');
            throw err;
        }
    }

    /**
     * For login
     * @param {*} username 
     * @param {*} password 
     * @returns 
     */
    async signIn(username, password) {
        try {
            const [result,] = await this.db.execute(
                `SELECT username, user_id FROM users WHERE username = ?`,
                [username]
            );

            console.log(result)

            if (result.length === 0) {
                return null;
            }

            const user = result[0];

            return user;
        } catch(err) {
            console.error('Models Error: account -> signIn');
            throw err;
        }
    }
}

export default Account;