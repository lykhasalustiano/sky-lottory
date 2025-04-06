import jwt from 'jsonwebtoken';
import History from "../../models/history.js";

class HistoryController {
    /**
     * Controll History data
     */

    constructor() {
        this.history = new History();
    }

    async getHistory(req, res) {
        const {user_id} = req.body || {};
        
        try {

            console.log('ID HEREEEEEE:: 🔴🔴', user_id)
            const historyData = await this.history.getHistory(user_id);
            
            if (!historyData || historyData.length === 0) {
                return res.json({
                    success: false,
                    message: "No history found",
                    data: null
                });
            }

            return res.json({
                success: true,
                message: "History fetched successfully",
                data: historyData
            });
        } catch (err) {
            console.error(`Controller Error -> getHistory: ${err}`);
            return res.status(500).json({
                success: false,
                message: err,
                data: null
            });
        }
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


