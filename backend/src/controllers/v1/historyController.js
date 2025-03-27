import jwt from 'jsonwebtoken';
import History from "../../models/history.js";

class HistoryController {
    /**
     * Controll History data
     */

    constructor() {
        this.history = new History();
    }

    async addHistory(req, res) {
        const {user_id, game_status, game_price} = req.body || {};

        const validStatus = ["win", "lose"]
        console.log(validStatus.includes(game_status.toLowerCase()))
        if (!validStatus.includes(game_status.toLowerCase())){
            return res.json({
                success: false,
                message: "Invalid game status",
                data: null
            });
        }
        try {
            const response = await this.history.addHistory(user_id, game_price, game_status.toLowerCase());
            
            if (!response) {
                return res.json({
                    success: false,
                    message: "Status not found",
                    data: null
                });
            }

            return res.json({
                success: true,
                message: "Status fetched successfully",
                data: response
            });
        } catch (err) {
            console.error(`Controller Error -> getHistory: ${err}`);
            throw err;
        }
    }


}
export default HistoryController;


