const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const Story = require('../models/Story')

// @desc    Login/Landing page
// @router  Get /land
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @desc     Dashbord
// @route    Get /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    // console.log(req.user)
    try {
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: req.user.givenName,
            stories
        })
    } catch (error) {
        console.error(error);
        res.render('/errors/500')
    }
})

module.exports = router