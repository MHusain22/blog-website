import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(process.env.FRONTEND_URL));
// app.use(
//   cors({
//     origin:  process.env.FRONTEND_URL, // Replace with your frontend URL
//   })
// );
dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  markdown: String,
});

const Article = mongoose.model("Article", articleSchema);

app.post("/createarticles", async (req, res) => {
  const { title, description, markdown } = req.body;
  try {
    const newArticle = new Article({ title, description, markdown });
    await newArticle.save();
    res.status(201).json({ message: "Article created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/getarticles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the article by ID
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    console.error("Error finding article by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  // const { title, description, markdown } = req.body;
  console.log(id);
  try {
    // Find the article by ID and update it with the new data
    const updatedArticle = await Article.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/search", async (req, res) => {
  try {
    // Retrieve blog posts from the database (e.g., using Mongoose for MongoDB)
    const blogPosts = await Article.find();
    res.json(blogPosts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  //to get id
  console.log(id);

  try {
    // Delete the article from the database
    await Article.findByIdAndDelete(id);
    res.status(204).send(); // Send a 204 No Content response on successful deletion
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is sucessfully running on ${port}`);
});
