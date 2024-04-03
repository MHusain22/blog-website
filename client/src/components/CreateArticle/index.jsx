import React from "react";
import { useState, useRef } from "react";
import "./style.css";
import Header from "../Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API_URL from "../Util/backend";

const CreateArticle = () => {
  
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState({
    title: "",
    description: "",
    markdown: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${API_URL}/createarticles`,
        articleData
      );

      console.log("Article created successfully!", res);
      // Reset the form after successful submission
      setArticleData({
        title: "",
        description: "",
        markdown: "",
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="main">
        <h1>New Article</h1>

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
          <Link to="/">
            <button className="cnbtn">Cancel</button>
          </Link>
          <button onClick={handleSubmit} className="savebtn">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateArticle;
