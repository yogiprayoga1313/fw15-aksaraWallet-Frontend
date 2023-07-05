import cookieConfig from "@/helpers/cookieConfig";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function forgotPassword(req, res) {
        try {
            const request = await fetch('https://outstanding-train-fawn.cyclic.app/auth/reset-password', {
                method: "POST",
                body: new URLSearchParams(req.body).toString(),
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                }
            })
            const response = await request.json()
            const token = response?.results?.token
            if (token) {
                req.session.token = token
                await req.session.save()
            }
            return res.json(response)
        }catch(err){
            return res.status(401).json({
                success: false,
                message: 'forgot password failed'
            })
        }

    },
    cookieConfig
);