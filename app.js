const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { response } = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const { lowerCase, truncate } = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", true);

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

const homeStartingContent =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis reprehenderit cumque eos, animi explicabo architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt. Sapiente, alias quas?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis reprehenderit cumque eos, animi explicabo architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt. Sapiente, alias quas?";
const aboutPageContent =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis reprehenderit cumque eos, animi explicabo architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt.  architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt. Sapiente, alias quas?";
const contactPageContent =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis reprehenderit cumque eos, animi explicabo architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt. Sapiente, alias quas?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis reprehenderit cumque eos, animi explicabo ";

const PORT_URL = 3000;

// HOME ROUTE
app.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {
      console.log(err);
    } else {
      res.render("home", { homeContent: homeStartingContent, posts: posts });
    }
  });
  // console.log(posts);
});

// ABOUT ROUTE
app.get("/about", function(req, res) {
  res.render("about", { aboutContent: aboutPageContent });
});

// CONTACT ROUTE
app.get("/contact", function(req, res) {
  res.render("contact", { contactContent: contactPageContent });
});

// COMPOSE ROUTE
app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postDescription
  });

  post.save();
  res.redirect("/");
});

// DYNAMIC ROUTE
app.get("/posts/:postId", function(req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function(err, post) {
    if (err) {
      console.log(err);
    } else {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

app.listen(PORT_URL, function() {
  console.log("Server is running on port" + PORT_URL);
});
