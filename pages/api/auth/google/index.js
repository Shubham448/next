import nextConnect from "next-connect";
import passport from "passport";
import { passportLogin } from "../../../../utils/services/passport";
passportLogin(passport);

const apiRoute = nextConnect({
    onError: (err, req, res, next) => {
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Page is not found");
    },
})
.use(passport.initialize())
.use(passport.authenticate('google', { scope: ['profile', 'email'] }))
.get(async(req, res) => {
});

export default apiRoute;
