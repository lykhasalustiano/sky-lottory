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
    async getHistory(user_id) {
        try {
            // Fetch the latest 10 bets from today and 10 from yesterday
            const [results] = await this.db.execute(
                `(SELECT * FROM history WHERE user_id = ? AND DATE(history_date) = CURDATE() ORDER BY history_date DESC LIMIT 10)
                 UNION
                 (SELECT * FROM history WHERE user_id = ? AND DATE(history_date) = CURDATE() - INTERVAL 1 DAY ORDER BY history_date DESC LIMIT 10)`,
                [user_id, user_id]
            );
    
            // If no bets found, return a failure response
            if (!results.length) {
                return {
                    success: false,
                    message: "No betting history found.",
                    data: null
                };
            }
    
            return results
        
        } catch (err) {
            console.error('Models Error: history -> getHistory', err);
            return {
                success: false,
                message: "An error occurred while fetching history.",
                data: null
            };
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