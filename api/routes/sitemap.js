const express = require('express');
const router = express.Router();
const SitemapController = require('../controllers/SitemapController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.post('/generate', jwtMiddleware, SitemapController.generateSitemap);
router.get('/results/:id', jwtMiddleware, SitemapController.getSitemapResults);

module.exports = router;