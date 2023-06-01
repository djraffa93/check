const mongoose = require('mongoose');

const SitemapSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accessibilityScore: Number,
  bestPracticesScore: Number,
  performanceScore: Number,
  seoScore: Number,
  analysisTimestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sitemap', SitemapSchema);