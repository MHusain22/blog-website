import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="home-header">
    <h1>
      <span>justBlog</span>
    </h1>
    <div className="nav">
      <ul>
        <Link style={{ textDecoration: "none" }} to="/">
          <li>Home</li>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/CreateArticle">
          <li>Create Atricle</li>
        </Link>
      </ul>
    </div>
  </header>
);

export default Header;
