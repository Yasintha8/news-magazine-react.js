import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY || "your-default-api-key-here"; // Fallback API key for testing purposes
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    setLoading(true);
    setError(null);

    fetch(url, {
      headers: {
        "Upgrade-Insecure-Requests": "1",
        "Accept": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data); // Log the response to check the structure
        if (data && data.articles && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setError("No articles found or invalid data format.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load news. Please try again later.");
        setLoading(false);
        console.error("Error fetching news:", err);
      });
  }, [category]);

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger mt-2">News</span>
      </h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {articles.length === 0 && !loading && !error && (
        <p>No articles found or invalid data format.</p>
      )}
      {articles.map((news, index) => {
        return (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        );
      })}
    </div>
  );
};

export default NewsBoard;
