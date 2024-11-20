require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Url = require('./models/Url');
const crypto = require('crypto');
const validateUrl = require('valid-url');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Generate short code
function generateShortCode(length = 6) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

// API Routes
app.post('/api/shorten', async (req, res) => {
    const { url } = req.body;

    // Validate URL
    if (!validateUrl.isUri(url)) {
        return res.status(400).json({ error: 'Invalid URL provided' });
    }

    try {
        // Check if URL already exists
        let urlDoc = await Url.findOne({ originalUrl: url });
        
        if (!urlDoc) {
            // Generate unique short code
            let shortCode;
            let isUnique = false;
            
            while (!isUnique) {
                shortCode = generateShortCode();
                const existing = await Url.findOne({ shortCode });
                if (!existing) {
                    isUnique = true;
                }
            }
            
            urlDoc = await Url.create({
                originalUrl: url,
                shortCode,
            });
        }

        const shortUrl = `${req.protocol}://${req.get('host')}/${urlDoc.shortCode}`;
        res.json({ shortUrl });
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Redirect route
app.get('/:shortCode', async (req, res) => {
    try {
        const url = await Url.findOne({ shortCode: req.params.shortCode });
        
        if (!url) {
            return res.status(404).send('URL not found');
        }

        // Increment clicks
        await Url.updateOne(
            { _id: url._id },
            { $inc: { clicks: 1 } }
        );

        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Error redirecting:', error);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});