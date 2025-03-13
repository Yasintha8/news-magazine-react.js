import image from '../assets/image.png';

const NewsItem = ({ title, description, src, url }) => {
  // Debugging step - Check the title and description props.
  console.log("NewsItem title:", title);

  return (
    <div className="card bg-dark text-light mb-3 d-inline-block my-3 mx-3 px-2 py-2" style={{ maxWidth: "305px" }}>
      <img 
        src={src || image} 
        style={{ height: "200px", width: "285px" }} 
        className="card-img-top" 
        alt="News" 
      />
      <div className="card-body">
        <h5 className="card-title">
          {title && title.trim() ? title.slice(0, 50) : "No Title Available"}
        </h5>
        <p className="card-text">
          {description ? description.slice(0, 90) : "News Not Available"}
        </p>
        <a 
          href={url} 
          className="btn btn-primary" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
