import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Chip from "../../common/Chip";
import "./styles.css";
import API_URL from "../../Util/backend";

const BlogItem = () => {
  const [articles, setArticles] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios.delete(API_URL+`/${id}`);
      setIsDelete(true);
      // Notify parent component that the article has been deleted
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getarticles");
        setArticles(response.data);
        setIsDelete(false);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, [isDelete]); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="">
      <h1 className="heading">Articles</h1>
      <div className="article-list">
        {articles.map((article) => (
          <div className="article" key={article._id}>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <Link to={`/${article._id}`}>
              <button className="rmbtn">Read more</button>
            </Link>
            {/* <button>Edit Article</button> */}
            <button className="dlbtn" onClick={() => handleDelete(article._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default BlogItem;

// <div className='blogItem-wrap'>
//   <img className='blogItem-cover' src={cover} alt='cover' />
//   <Chip label={category} />
//   <h3>{title}</h3>
//   <p className='blogItem-desc'>{description}</p>
//   <footer>
//     <div className='blogItem-author'>
//       <img src={authorAvatar} alt='avatar' />
//       <div>
//         <h6>{authorName}</h6>
//         <p>{createdAt}</p>
//       </div>
//     </div>
//     <Link className='blogItem-link' to={`/blog/${id}`}>
//       ➝
//     </Link>
//   </footer>
// </div>
