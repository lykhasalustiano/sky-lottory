import Game from '../../models/game.js';

class GameController {
    /**
     * Control Game Logic
     */
    constructor() {
        this.game = new Game();
    }

    async placeBet(req, res) {
        const { user_id, bet_amount, numbers } = req.body || {};

        try {
            const response = await this.game.placeBet(user_id, bet_amount, numbers);
            return res.json({
                success: true,
                message: 'Bet placed successfully',
                bet_id: response.bet_id
            });
        } catch (err) {
            console.error(`Controller Error -> placeBet: ${err}`);
            return res.status(500).json({ success: false, message: 'Error placing bet' });
        }
    }

    async getGameState(req, res) {
        try {
            const gameState = await this.game.getGameState();
            return res.json({ success: true, gameState });
        } catch (err) {
            console.error(`Controller Error -> getGameState: ${err}`);
            return res.status(500).json({ success: false, message: 'Error retrieving game state' });
        }
    }

    async drawWinningNumbers(req, res) {
        try {
            const winningNumbers = await this.game.drawWinningNumbers();
            return res.json({ success: true, winningNumbers });
        } catch (err) {
            console.error(`Controller Error -> drawWinningNumbers: ${err}`);
            return res.status(500).json({ success: false, message: 'Error drawing winning numbers' });
        }
    }
}

export default GameController;