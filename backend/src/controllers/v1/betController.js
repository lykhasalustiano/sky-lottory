import jwt from 'jsonwebtoken';
import Bet from "../../models/bet.js";

class BetController {
    /**
     * Control Bet data
     */
    constructor() {
        this.bet = new Bet();
    }

    async placeBet(req, res) {
        const { user_id, round_id, bet_amount, bet_number } = req.body || {};
        
        try {
            const response = await this.bet.placeBet(user_id, round_id, bet_amount, bet_number);
            return res.json(response);
        } catch (err) {
            console.error(`Controller Error -> placeBet: ${err}`);
            return res.status(500).json({
                success: false,
                message: "Error placing bet.",
                data: null
            });
        }
    }

    async resolveBet(req, res) {
        const { bet_id, is_win, payout_multiplier } = req.body || {};
        
        try {
            const response = await this.bet.resolveBet(bet_id, is_win, payout_multiplier);
            return res.json(response);
        } catch (err) {
            console.error(`Controller Error -> resolveBet: ${err}`);
            return res.status(500).json({
                success: false,
                message: "Error resolving bet.",
                data: null
            });
        }
    }

    async getBetHistory(req, res) {
        const { user_id } = req.params || {};
        
        try {
            const response = await this.bet.getBetHistory(user_id);
            return res.json(response);
        } catch (err) {
            console.error(`Controller Error -> getBetHistory: ${err}`);
            return res.status(500).json({
                success: false,
                message: "Error fetching bet history.",
                data: null
            });
        }
    }
}

export default BetController;
