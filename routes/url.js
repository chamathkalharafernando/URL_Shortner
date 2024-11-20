const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const validateUrl = require('valid-url');
const Url = require('../models/Url');

// Generate short code
const generateShortCode = (length = 6) => {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};

// Create short URL
router.post('/shorten', async (req, res) => {
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

// Redirect to original URL
router.get('/:shortCode', async (req, res) => {
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

module.exports = router;