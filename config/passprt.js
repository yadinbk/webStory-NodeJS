var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User')

module.exports = (passport) => {
    passport.use(
        // setting new Google strategy with enc config anf wanted routes
        new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
        // creating new user from google account profile and add to database
        async function (accessToken, refreshToken, profile, cb) {
            // console.log(profile);
            const newUser = {
                googleId: profile.id,
                displayName: profile.displayName,
                givenName: profile.name.givenName,
                familyName: profile.name.familyName,
                image: profile.photos[0].value,
            }
            User.findOrCreate(newUser, (err, user) => {
                cb(null, user);
            })
        }
    ));
    // setting session cockies 
    passport.serializeUser((user, done) =>
        done(null, user.id));

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}

