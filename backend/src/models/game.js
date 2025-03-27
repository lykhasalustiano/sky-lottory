import { connection } from "../core/database.js";
import { encryptPassword } from "../utils/hash.js";

class Game {
    constructor() {
        this.db = connection;
    }

    /**
     * Place a bet
     * @param {*} user_id
     * @param {*} betAmount 
     * @param {*} chosenNumbers 
     * @returns 
     */
    async placeBet(userId, betAmount, chosenNumbers) {
        try {
            const numbersString = JSON.stringify(chosenNumbers);
            const [results,] = await this.db.execute(
                `INSERT INTO bets(user_id, bet_amount, chosen_numbers) VALUES (?, ?, ?)`,
                [userId, betAmount, numbersString]
            );
            return results;
        } catch (err) {
            console.error('Models Error: game -> placeBet', err);
            throw err;
        }
    }

    /**
     * Get current game state
     * @returns {Object} 
     */
    async getGameState() {
        try {
            const [potResult,] = await this.db.execute(
                `SELECT SUM(bet_amount) AS pot_money FROM bets`
            );
            
            const potMoney = potResult[0]?.pot_money || 0;
            const timer = await this.getGameTimer();
            
            return { potMoney, timer };
        } catch (err) {
            console.error('Models Error: game -> getGameState', err);
            throw err;
        }
    }

    /**
     * Get game timer (Placeholder logic, replace with actual implementation)
     * @returns {number} time remaining in seconds
     */
    async getGameTimer() {
        // Placeholder logic for fetching timer
        return 300; // 5 minutes countdown
    }

    /**
     * Draw winning numbers (Placeholder logic, replace with actual implementation)
     * @returns {Array} winning numbers
     */
    async drawWinningNumbers() {
        try {
            const winningNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 1);
            return winningNumbers;
        } catch (err) {
            console.error('Models Error: game -> drawWinningNumbers', err);
            throw err;
        }
    }
}

export default Game;
