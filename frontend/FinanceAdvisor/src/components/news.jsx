import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/news.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:8001/api/news?category=business");
        console.log("Fetched Business News:", response.data);  // Debugging
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      <h1 className="news-title">Business News</h1>

      {(
        <div className="news-grid">
          {news.map((article, index) => (
            <div key={index} className="news-card">
              <img
                src={article.banner_image || "https://via.placeholder.com/200"}
                alt={article.title}
                className="news-image"
              />
              <h2 className="news-heading">{article.title}</h2>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-button">
                Read More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
