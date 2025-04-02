import { connection } from "../core/database.js";

class Bet {
    constructor() {
        this.db = connection;
    }

    /**
     * Place a bet
     * @param {*} user_id 
     * @param {*} round_id
     * @param {*} bet_amount 
     * @param {*} bet_number
     * @returns 
     */
    async placeBet(user_id, round_id, bet_amount, bet_number) {
        try {
            const [user] = await this.db.execute(
                `SELECT user_money FROM users WHERE user_id = ?`,
                [user_id]
            );

            if (user.length === 0 || user[0].user_money < bet_amount) {
                return { success: false, message: "Insufficient balance." };
            }

            await this.db.execute(
                `UPDATE users SET user_money = user_money - ? WHERE user_id = ?`,
                [bet_amount, user_id]
            );

            const [result] = await this.db.execute(
                `INSERT INTO bets (user_id, round_id, bet_amount, bet_number) VALUES (?, ?, ?, ?)`,
                [user_id, round_id, bet_amount, bet_number]
            );

            return { success: true, message: "Bet placed successfully.", bet_id: result.insertId };
        } catch (err) {
            console.error("Models Error: bet -> placeBet", err);
            throw err;
        }
    }

    // /**
    //  * Resolve a bet (win/lose)
    //  * @param {*} bet_id
    //  * @param {*} is_win
    //  * @param {*} payout_multiplier
    //  * @returns 
    //  */
    // async resolveBet(bet_id, is_win, payout_multiplier = 2) {
    //     try {
    //         const [bet] = await this.db.execute(
    //             `SELECT user_id, bet_amount FROM bets WHERE bet_id = ?`,
    //             [bet_id]
    //         );

    //         if (bet.length === 0) {
    //             return { success: false, message: "Bet not found." };
    //         }

    //         const { user_id, bet_amount } = bet[0];
    //         let winnings = 0;
    //         let status = "lose";

    //         if (is_win) {
    //             winnings = bet_amount * payout_multiplier;
    //             status = "win";
    //             await this.db.execute(
    //                 `UPDATE users SET user_money = user_money + ? WHERE user_id = ?`,
    //                 [winnings, user_id]
    //             );
    //         }

    //         await this.db.execute(
    //             `UPDATE bets SET status = ?, winnings = ? WHERE bet_id = ?`,
    //             [status, winnings, bet_id]
    //         );

    //         return { success: true, message: `Bet resolved as ${status}.`, winnings };
    //     } catch (err) {
    //         console.error("Models Error: bet -> resolveBet", err);
    //         throw err;
    //     }
    // }

    /**
     * Get user's betting history
     * @param {*} user_id 
     * @returns 
     */
    async getBetHistory(user_id) {
        try {
            const [history] = await this.db.execute(
                `SELECT round_id, bet_amount, bet_number, winnings FROM bets WHERE user_id = ? ORDER BY created_at DESC LIMIT 20`,
                [user_id]
            );

            return { success: true, message: "History fetched successfully.", data: history };
        } catch (err) {
            console.error("Models Error: bet -> getBetHistory", err);
            return { success: false, message: "Error fetching history.", data: null };
        }
    }
}

export default Bet;
