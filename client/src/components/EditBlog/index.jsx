import React from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API_URL from "../Util/backend";

const EditBlog = () => {

    const navigate  = useNavigate();
    const { id } = useParams();
    const [articleData, setArticleData] = useState({
        title: '',
        description: '',
        markdown: '',
      });
    
      useEffect(() => {
        const fetchArticle = async () => {
          try {
            // const response = await axios.get(`http://localhost:5000/${id}`);
            const response = await axios.get(API_URL+`/${id}`);
            setArticleData(response.data);
          } catch (error) {
            console.error('Error fetching article:', error);
          }
        };
    
        fetchArticle();
      }, [id]);
    
      const handleChange = (e) => {
        setArticleData({ ...articleData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await axios.put(API_URL+`/${id}`, articleData);
          console.log('Article updated successfully!');
          navigate("/");
          // Optionally, you can redirect the user to another page or perform other actions after successful update
        } catch (error) {
          console.error('Error updating article:', error);
        }
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <div className="main">
        <h1>Update Blog</h1>

        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          value={articleData.title}
          onChange={handleChange}
        />
        <label htmlFor="">Description</label>
        <textarea
          name="description"
          id=""
          value={articleData.description}
          onChange={handleChange}
          cols="30"
          rows="2"
        ></textarea>
        <label htmlFor="">Markdown</label>
        <textarea
          name="markdown"
          id=""
          value={articleData.markdown}
          onChange={handleChange}
          cols="30"
          rows="10"
        ></textarea>

        <div className="but">
          <Link to={`/${id}`}>
          <button className="cnbtn">Cancel</button>
          
          </Link>
          <button className="savebtn" onClick={handleSubmit}>Update</button>
        </div>
      </div>
        </form>
      );
};

export default EditBlog;
