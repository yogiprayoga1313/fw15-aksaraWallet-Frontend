const cookieConfig = {
    cookieName: "AksaraWallet",
    password: "+#qEedHDj%!wmr#XV&bqqxj%k5(gU%66",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
}

export default cookieConfig