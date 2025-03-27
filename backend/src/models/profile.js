import { connection } from "../core/database.js";

class Profile {
    /**
     * Profile Model for handling user balance and transactions
     */
    constructor() {
        this.db = connection;
    }

    /**
     * Fetch user profile details
     * @param {*} userId 
     * @returns 
     */
    async getProfile(userId) {
        try {
            const [result] = await this.db.execute(
                `SELECT username, balance FROM users WHERE user_id = ?`,
                [userId]
            );

            if (result.length === 0) {
                return null;
            }

            return result[0];
        } catch (err) {
            console.error("Models Error: profile -> getProfile", err);
            throw err;
        }
    }

    /**
     * Deposit money into user account
     * @param {*} userId 
     * @param {*} amount
     * @returns
     */
    async deposit(userId, amount) {
        try {
            const [result] = await this.db.execute(
                `UPDATE users SET user_money = user_money + ? WHERE user_id = ?`,
                [amount, userId]
            );

            return result;
        } catch (err) {
            console.error("Models Error: profile -> deposit", err);
            throw err;
        }
    }

    // /**
    //  * Withdraw money from user account
    //  * @param {*} userId 
    //  * @param {*} amount 
    //  * @returns 
    //  */
    // async withdraw(userId, amount) {
    //     try {
    //         const [result] = await this.db.execute(
    //             `UPDATE users SET balance = balance - ? WHERE user_id = ? AND balance >= ?`,
    //             [amount, userId, amount]
    //         );

    //         return result;
    //     } catch (err) {
    //         console.error("Models Error: profile -> withdraw", err);
    //         throw err;
    //     }
    // }
}

export default Profile;