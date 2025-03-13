import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);      // To handle any fetch errors

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Check if the response has the expected 'articles' property
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

  if (loading) {
    return <div className="text-center">Loading news...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-center">
        Latest <span className="badge bg-danger mt-2">News</span>
      </h2>
      {articles.length === 0 ? (
        <p className="text-center">No articles available in this category.</p>
      ) : (
        articles.map((news, index) => (
          <NewsItem
            key={index}
            title={news.title}
            description={news.description}
            src={news.urlToImage}
            url={news.url}
          />
        ))
      )}
    </div>
  );
};

export default NewsBoard;
