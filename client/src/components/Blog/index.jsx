import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";
import { Link } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog">
      <h2>{article.title}</h2>
      <Link to={`/edit/${article._id}`}>
        <button className="edtbtn">Edit</button>
      </Link>
      <p className="des">{article.description}</p>
      <p>{article.markdown}</p>
    </div>
  );
};

export default Blog;


