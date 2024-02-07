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

// const { id } = useParams();
// const [blog, setBlog] = useState(null);

// useEffect(() => {
//   let blog = blogList.find((blog) => blog._id === parseInt(id));
//   if (blog) {
//     setBlog(blog);
//   }
// }, []);

// return (
//   <>
//     <h1>hello</h1>
//   </>
// );
{
  /* <Link className="blog-goBack" to="/">
  <span> &#8592;</span> <span>Go Back</span>
</Link>
{blog ? (
  <div className="blog-wrap">
    <header>
      <p className="blog-date">Published {blog.createdAt}</p>
      <h1>{blog.title}</h1>
      <div className="blog-subCategory">
        {blog.subCategory.map((category, i) => (
          <div key={i}>
            <Chip label={category} />
          </div>
        ))}
      </div>
    </header>
    <img src={blog.cover} alt="cover" />
    <p className="blog-desc">{blog.description}</p>
  </div>
) : (
  <EmptyList />
)} */
}
