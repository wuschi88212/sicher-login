const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory user store (for demo). Password is stored hashed.
const USER = {
  username: "peter",
  passwordHash: "$2b$10$WR5Fp6Zj82YqwKMW56RYzO0ObzHVWGeF.MQGUniH//aXzdpKZws.W"
};

// Use a strong random secret in production; for demo we use env var or fallback
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'change_this_secret_in_production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SECRET));

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to protect the secret page
function requireAuth(req, res, next) {
  const session = req.signedCookies.session;
  if (session && session.username === USER.username) return next();
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.status(401).json({ ok: false, message: 'Not authenticated' });
  }
  return res.redirect('/login.html');
}

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ ok: false, message: 'Missing credentials' });

    if (username !== USER.username) return res.status(401).json({ ok: false, message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, USER.passwordHash);
    if (!match) return res.status(401).json({ ok: false, message: 'Invalid credentials' });

    res.cookie('session', { username: USER.username }, { signed: true, httpOnly: true, maxAge: 1000*60*60 });
    return res.json({ ok: true, redirect: '/geheim.html' });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ ok: false, message: 'Server error' });
  }
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  res.clearCookie('session');
  return res.json({ ok: true });
});

// Protect the geheim.html route
app.get('/geheim.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'geheim.html'));
});

// Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
