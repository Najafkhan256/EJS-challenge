const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { response } = require("express");
const _ = require("lodash");
const { lowerCase, truncate } = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [
  {
    title: "Title",
    content:
      "adipisicing elit. Quis reprehenderit cumque eos, animi explicabo architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt. Sapiente, alias quas?Lorem ipsum dolor sit amet consectetur,"
  }
];

const homeStartingContent =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis reprehenderit cumque eos, animi explicabo architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt. Sapiente, alias quas?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis reprehenderit cumque eos, animi explicabo architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt. Sapiente, alias quas?";
const aboutPageContent =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis reprehenderit cumque eos, animi explicabo architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt.  architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt. Sapiente, alias quas?";
const contactPageContent =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis reprehenderit cumque eos, animi explicabo architecto nam! Dicta enim est sequi nostrum explicabo inventore eligendi saepe vitae sunt. Sapiente, alias quas?Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis reprehenderit cumque eos, animi explicabo ";

const PORT_URL = 3000;

// HOME ROUTE
app.get("/", function(req, res) {
  res.render("home", { homeContent: homeStartingContent, posts: posts });
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
  // METHOD 1
  /*   const post = req.body.postTitle;
  const postDesc = req.body.postDescription;

  posts.title = req.body.postTitle;
  posts.content = req.body.postDescription; */

  // METHOD 2
  const post = {
    title: req.body.postTitle,
    content: req.body.postDescription
  };
  posts.push(post);
  res.redirect("/");

  // console.log("Post Title: " + post + " and message is: " + postDesc);
  // console.log(posts);
});

// DYNAMIC ROUTE
app.get("/posts/:post", function(req, res) {
  const requestTitle = _.lowerCase(req.params.post);

  posts.forEach(post => {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestTitle) {
      // METHOD 1
      res.render("post", {
        title: post.title,
        content: post.content
      });
      // METHOD 2
      // res.render("post", { post: post });
    }
  });
});

app.listen(PORT_URL, function() {
  console.log("Server is running on port" + PORT_URL);
});
