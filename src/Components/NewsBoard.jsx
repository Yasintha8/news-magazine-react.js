import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);      // To handle any fetch errors

  useEffect(() => {
    // Ensure the API key is being accessed correctly
    console.log('API Key:', import.meta.env.VITE_API_KEY); // Debugging: check the API key

    // Fetch URL with category from props and the API key
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;

    setLoading(true); // Set loading state to true when fetching data
    setError(null);   // Reset error state

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((err) => {
        setError("Failed to load news. Please try again later.");  // Handle fetch errors
        setLoading(false);
        console.error("Error fetching news:", err);
      });
  }, [category]); // Re-run effect when category changes

  // Show loading indicator or error message while data is being fetched
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
        articles.map((news, index) => {
          return (
            <NewsItem
              key={index}
              title={news.title}
              description={news.description}
              src={news.urlToImage}
              url={news.url}
            />
          );
        })
      )}
    </div>
  );
};

export default NewsBoard;
