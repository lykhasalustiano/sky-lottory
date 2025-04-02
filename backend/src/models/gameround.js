import { connection } from "../core/database.js";

class GameRound {
    /**
     * GameRound Model for handling game round operations
     */
    constructor() {
        this.db = connection;
    }

    /**
     * Start a new game round
     * @param {*} user_id 
     * @returns 
     */
    async startRound(user_id) {
        try {
            const [results,] = await this.db.execute(
                `INSERT INTO game_round(round_id, created_at) VALUES (?, NOW())`,
                [user_id]
            );
            
            return { round_id: results.insertId };
        } catch(err) {
            console.error('Models Error: gameRound -> startRound');
            throw err;
        }
    }

    /**
     * Fetch game round details
     * @param {*} round_id 
     * @returns 
     */
    async getRoundDetails(round_id) {
        try {
            const [result,] = await this.db.execute(
                `SELECT * FROM game_round WHERE round_id = ?`,
                [round_id]
            );
            
            if (result.length === 0) {
                return null;
            }
            
            return result[0];
        } catch(err) {
            console.error('Models Error: gameRound -> getRoundDetails');
            throw err;
        }
    }
}

export default GameRound;