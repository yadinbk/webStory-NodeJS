const express = require('express')
const passport = require('passport')
const router = express.Router();

// @desc    Auth with Google
// @router  Get /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc     Google auth callback
// @router  Get /auth/google/callback
router.get(
    '/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/dashboard')
    })

// @desc Logout user
// @rout  Get /auth/logout
router.get('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

module.exports = router