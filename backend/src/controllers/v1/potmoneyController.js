import PotMoney from '../../models/potmoney.js';

class PotMoneyController {
    /**
     * Controller for Pot Money transactions
     */
    constructor() {
        this.potMoney = new PotMoney();
    }

    /**
     * Add money to the pot
     */
    async addMoney(req, res) {
        const {pot_id, pot_amount} = req.body || {};

        try {
            const response = await this.potMoney.addMoney(pot_id, pot_amount);
            return res.json({
                success: true,
                message: 'Money added successfully',
                response
            });
        } catch (err) {
            console.error(`Controller Error -> addMoney: ${err}`);
            return res.status(500).json({
                success: false,
                message: 'Failed to add money'
            });
        }
    }

    /**
     * Withdraw money from the pot
     */
    async withdrawMoney(req, res) {
        const { pot_id, amount } = req.body || {};

        try {
            const response = await this.potMoney.withdrawMoney(pot_id, amount);
            return res.json({
                success: true,
                message: 'Money withdrawn successfully',
                response
            });
        } catch (err) {
            console.error(`Controller Error -> withdrawMoney: ${err}`);
            return res.status(500).json({
                success: false,
                message: 'Failed to withdraw money'
            });
        }
    }

    /**
     * Get current pot money balance
     */
    async getBalance(req, res) {
        const {pot_id} = req.params || {};

        try {
            const balance = await this.potMoney.getBalance(pot_id);
            return res.json({
                success: true,
                message: 'Balance retrieved successfully',
                balance
            });
        } catch (err) {
            console.error(`Controller Error -> getBalance: ${err}`);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve balance'
            });
        }
    }
}

export default PotMoneyController;