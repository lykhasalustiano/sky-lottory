import jwt from "jsonwebtoken";
import Profile from "../../models/profile.js";

class ProfileController {
    /**
     * Control Profile data
     */
    constructor() {
        this.profile = new Profile();
    }
    

    async getProfile(req, res) {
        const { user_id } = req.body || {};

        try {
            const response = await this.profile.getProfile(user_id);
            
            if (!response) {
                return res.json({
                    success: false,
                    message: "Profile not found",
                    data: null
                });
            }

            return res.json({
                success: true,
                message: "Profile fetched successfully",
                data: response
            });
        } catch (err) {
            console.error(`Controller Error -> getProfile: ${err}`);
            throw err;
        }
    }


    async deposit(req, res) {
        const { user_id, amount } = req.body || {};

        console.log(user_id, amount);

        if (!user_id) {
            return res.json({
                success: false,
                message: "Unidentified nigga user ⚰️",
                balance: null
            });
        }

        try {
            const response = await this.profile.deposit(user_id, amount);
            
            return res.json({
                success: true,
                message: "Deposit successful",
                balance: response.balance
            });
        } catch (err) {
            console.error(`Controller Error -> deposit: ${err}`);
            throw err;
        }
    }

    // async withdraw(req, res) {
    //     const { user_id, amount } = req.body || {};

    //     try {
    //         const response = await this.profile.withdraw(user_id, amount);
            
    //         if (!response.success) {
    //             return res.json({
    //                 success: false,
    //                 message: "Insufficient balance",
    //                 balance: response.balance
    //             });
    //         }

    //         return res.json({
    //             success: true,
    //             message: "Withdrawal successful",
    //             balance: response.balance
    //         });
    //     } catch (err) {
    //         console.error(`Controller Error -> withdraw: ${err}`);
    //         throw err;
    //     }
    // }
}

export default ProfileController;
