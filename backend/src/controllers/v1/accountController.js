import jwt from 'jsonwebtoken';
import Account from '../../models/account.js';

class AccountController {
    /**
     * Controll Account data
     */
    constructor() {
        this.account = new Account();
    }
    
    async signUp(req, res) {
        const { username, password, email } = req.body || {};

        try {
            const response = await this.account.signUp(username, email, password)
            
            return res.json({
                success: true,
                message: 'Succesfully Created an Account',
                account_id: response.user_id
            });

        } catch(err) {
            console.error(`Controller Error -> signUp: ${err}`)
            throw err;
        }
    }

    async signIn(req, res) {
        const { username, password } = req.body || {};

        try {
            const response = await this.account.signIn(username,password)

            console.log(response);
            if (!response){
                return res.json({
                    success: false,
                    message:'Failed Sign In No Account found',
                    account_id: response
                });
            }

            return res.json({
                success: true,
                message:'Succefully Sign In',
                account_id: response.user_id
            });

        } catch(err) {
            console.error(`Controller Error -> signIn: ${err}`)
            throw err;
        }
    }

}

export default AccountController;