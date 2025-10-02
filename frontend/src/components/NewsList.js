import React, { useEffect, useState } from 'react';
import api from '../api';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news/trending');
      setNews(response.data);
    } catch (err) {
      setError('Failed to fetch news');
    }
  };

  return (
    <div>
      <h2>Trending News</h2>
      {error && <div className="error">{error}</div>}
      <div>
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            {article.image && <img src={article.image} alt={article.title} />}
            <p>Source: {article.source}</p>
            <p>Published: {new Date(article.published_at).toLocaleDateString()}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
