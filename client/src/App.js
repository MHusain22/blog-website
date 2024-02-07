import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Blog from "./components/Blog";
import Home from "./components/Home";
import CreateArticle from "./components/CreateArticle";
import EditBlog from "./components/EditBlog";

const App = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Blog />} />
        <Route path="/CreateArticle" element={<CreateArticle />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </div>
  );
};

export default App;
