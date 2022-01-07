import nextConnect from "next-connect";
import passport from "passport";

const apiRoute = nextConnect({
    onError: (err, req, res, next) => {
        console.error(err);
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Page is not found");
    },
})
.get(async(req, res) => {
    passport.authenticate('google', {}, (token, info, refreshToken) => {
        console.log('token', token);
        console.log('info', info);
        console.log('refresh', refreshToken)
        if (token) {
            req.data = token;
            req.status = 200;
            req.message = 'User Logged in Succcessfully';
            res.redirect(`http://localhost:3000?access_token=${token}}`);
        } else {
            req.data = null;
            req.status = 403;
            res.redirect(`http://localhost:3000`);
        }
    })(req, res)
});

export default apiRoute;
