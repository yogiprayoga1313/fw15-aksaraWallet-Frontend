import cookieConfig from "@/helpers/cookieConfig";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    async function RegisterRoute(req, res) { 
        const request = await fetch('https://easy-tan-mite-vest.cyclic.cloud/auth/register', {
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

    },
    cookieConfig
);