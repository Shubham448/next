import passport from "passport";
import { Strategy } from 'passport-google-oauth20';
import { Trainers } from "../../db/models/trainer";

export const passportLogin = () => {
    passport.use('google', new Strategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/callback"
    },
        async function (accessToken, refreshToken, profile, cb) {
            console.log(accessToken)
            console.log(refreshToken)
            console.log(profile)
            let trainerRecord = await Trainers.findOne({
                where: {
                    social_id: profile.id
                }
            })
            if (trainerRecord) cb(accessToken, refreshToken, profile);
            else {
                let trainerprops = {
                    name: profile.displayName,
                    social_id: profile.id,
                    email: profile?.emails[0]?.value,
                    picture_url: profile?.photos[0]?.value,
                    access_token: accessToken
                }
                Trainers.create(trainerprops);
                cb(accessToken, refreshToken, profile);
            };
        }
    ));
};

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser(function (id, done) {
    Trainers.findOne(id, function (err, user) {
        done(err, user)
    });
});

