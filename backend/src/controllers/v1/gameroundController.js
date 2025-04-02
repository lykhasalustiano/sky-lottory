import GameRound from '../../models/gameround.js';

class GameRoundController {
    /**
     * Control Game Round data
     */
    constructor() {
        this.gameround = new GameRound();
    }
    
    async startRound(req, res) {
        const { user_id, gameMode } = req.body || {};

        try {
            const response = await this.gameround.startRound(user_id, gameMode);
            
            return res.json({
                success: true,
                message: 'Successfully started a new game round',
                round_id: response.round_id
            });
        } catch(err) {
            console.error(`Controller Error -> startRound: ${err}`);
            throw err;
        }
    }

    async getRoundDetails(req, res) {
        const { round_id } = req.params || {};

        try {
            const response = await this.gameround.getRoundDetails(round_id);
            
            if (!response) {
                return res.json({
                    success: false,
                    message: 'Game round not found',
                    round_id: null
                });
            }

            return res.json({
                success: true,
                message: 'Successfully fetched game round details',
                round_data: response
            });
        } catch(err) {
            console.error(`Controller Error -> getRoundDetails: ${err}`);
            throw err;
        }
    }
}

export default GameRoundController;