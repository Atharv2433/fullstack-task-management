const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

/**
 * @swagger
 * /news/trending:
 *   get:
 *     summary: Get trending news from multiple sources
 *     tags: [News]
 *     responses:
 *       200:
 *         description: List of trending news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   url:
 *                     type: string
 *                   image:
 *                     type: string
 *                   source:
 *                     type: string
 *                   published_at:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/trending', async (req, res) => {
  try {
    const mediastackKey = process.env.MEDIASTACK_API_KEY;
    const guardianKey = process.env.GUARDIAN_API_KEY;

    const [mediastackResponse, guardianResponse] = await Promise.all([
      axios.get(`http://api.mediastack.com/v1/news?access_key=${mediastackKey}&languages=en&limit=10`),
      axios.get(`https://content.guardianapis.com/search?api-key=${guardianKey}&show-fields=thumbnail,headline,byline&limit=10`)
    ]);

    const mediastackArticles = mediastackResponse.data.data.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.image,
      source: article.source,
      published_at: article.published_at
    }));

    const guardianArticles = guardianResponse.data.response.results.map(article => ({
      title: article.webTitle,
      description: article.fields?.headline || '',
      url: article.webUrl,
      image: article.fields?.thumbnail || '',
      source: 'The Guardian',
      published_at: article.webPublicationDate
    }));

    const allArticles = [...mediastackArticles, ...guardianArticles];

    res.json(allArticles);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
