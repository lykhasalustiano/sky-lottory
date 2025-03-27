import { connection } from "../core/database.js";

class History {
    /**
     * History Model for user betting records
     */
    constructor() {
        this.db = connection;
    }

    /**
     * Fetch user betting history
     * @param {*} userId 
     * @returns 
     */
    async getHistory(userId) {
        try {
            const [results,] = await this.db.execute(
                `SELECT * FROM betting_history WHERE user_id = ? ORDER BY bet_time DESC`,
                [userId]
            );
            return results;
        } catch (err) {
            console.error('Models Error: history -> getHistory', err);
            throw err;
        }
    }

    /**
     * Add a new betting entry
     * @param {*} user_id 
     * @param {*} amount istatus 
     * @returns 
     */
    async addHistory(user_id, amount, status) {
        try {
            const [result,] = await this.db.execute(
                `INSERT INTO history (user_id, game_status, game_price) VALUES (?, ?, ?)`,
                [user_id, status, amount]
            );
            return result;
        } catch (err) {
            console.error('Models Error: history -> addHistory', err);
            throw err;
        }
    }
}

export default History;