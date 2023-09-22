const router = require('express').Router();
const { User } = require('../../models');

// Render login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// Render signup page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

// API Route: Login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }
        req.session.save(() => {
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'Logged in successfully' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// API Route: Signup
router.post('/signup', async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password
        });
        req.session.save(() => {
            req.session.userId = newUser.id;
            req.session.loggedIn = true;
            res.json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// API Route: Logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// ... Any other routes related to users ...

module.exports = router;
