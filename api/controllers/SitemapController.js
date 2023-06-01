const axios = require('axios');
const SitemapGenerator = require('sitemap-generator');
const Sitemap = require('../models/Sitemap');
const User = require('../models/User');

exports.generateSitemap = async (req, res) => {
    try {
        const { userId, url } = req.body;

        // Find the user
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate sitemap
        const generator = SitemapGenerator(url, {
            stripQuerystring: true,
            filepath: './sitemap.xml' // you might want to save it in a more appropriate location
        });

        generator.start();

        generator.on('done', async () => {
            // Sitemap generation finished
            const sitemap = new Sitemap({
                user: user._id,
                url: url,
                filename: './sitemap.xml', // should be the same as above
                status: 'generated',
            });

            await sitemap.save();
            
            res.status(200).json({ message: 'Sitemap generation started. Please check back later for the generated sitemap.' });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSitemapResults = async (req, res) => {
    try {
        const { sitemapId } = req.params;

        // Find the sitemap
        const sitemap = await Sitemap.findById(sitemapId);

        if (!sitemap) {
            return res.status(404).json({ message: 'Sitemap not found' });
        }

        // Read the sitemap file and get the urls
        // You'll need to implement this based on where and how you're storing the generated sitemap file

        const urls = []; // array of urls from the sitemap

        // Now for each url, call the Google PageSpeed Insights API
        let results = [];
        for (let url of urls) {
            let result = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&key=${process.env.PAGESPEED_API_KEY}`);
            results.push(result.data);
        }

        // Save the results in the database

        // Return the results
        res.status(200).json({ results: results });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};