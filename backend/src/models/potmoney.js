import { connection } from "../core/database.js";

class PotMoney {
    /**
     * PotMoney Model for handling pot money transactions
     */
    constructor() {
        this.db = connection;
    }

    /**
     * Add money to the pot
     * @param {*} potId 
     * @param {*} amount 
     * @returns 
     */
    async addMoney(pot_id, amount) {
        try {
            const [results,] = await this.db.execute(
                `UPDATE pot_money SET pot_amount = pot_amount + ? WHERE po_id = ?`,
                [amount, pot_id]
            );
            return results;
        } catch(err) {
            console.error('Models Error: potMoney -> addMoney');
            throw err;
        }
    }

    /**
     * Withdraw money from the pot
     * @param {*} pot_id 
     * @param {*} amount 
     * @returns 
     */
    async withdrawMoney(pot_id, amount) {
        try {
            const [pot] = await this.db.execute(
                `SELECT pot_amount FROM pot_money WHERE po_id = ?`,
                [pot_id]
            );

            if (pot.length === 0 || pot[0].pot_amount < amount) {
                throw new Error("Insufficient funds");
            }

            const [results,] = await this.db.execute(
                `UPDATE pot_money SET pot_amount = pot_amount - ? WHERE po_id = ?`,
                [amount, pot_id]
            );
            return results;
        } catch(err) {
            console.error('Models Error: potMoney -> withdrawMoney');
            throw err;
        }
    }

    /**
     * Get current pot money balance
     * @param {*} pot_id 
     * @returns 
     */
    async getBalance(pot_id) {
        try {
            const [result,] = await this.db.execute(
                `SELECT pot_amount FROM pot_money WHERE po_id = ?`,
                [pot_id]
            );
            return result.length > 0 ? result[0].pot_amount : null;
        } catch(err) {
            console.error('Models Error: potMoney -> getBalance');
            throw err;
        }
    }
}

export default PotMoney;
