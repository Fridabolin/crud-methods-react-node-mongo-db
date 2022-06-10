const express = require("express");
const postRouter = express.Router();
const Post = require("../schimas/post");

//endpoints
postRouter.get("/getposts", (req, res) => {
  // const posts = [
  //   { title: "post 1", body: "this is a post" },
  //   { title: "post 1", body: "this is a post" },
  // ];
  // res.status(200).json({ posts: posts });
  Post.find({}, (err, documents) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "An error occured while retrieving posts",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({ posts: documents });
    }
  });
});

postRouter.post("/newpost", (req, res) => {
  console.log("post to add: ", req.body);
  const newPost = new Post({
    title: req.body.title,
    body: req.body.body,
  });
  newPost.save((err) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "An error occurred while saving post",
          msgError: true,
        },
      });
    } else {
      res.status(201).json({
        msg: {
          msgBody: "Post was saved",
          msgError: false,
        },
      });
    }
  });
});

//update post
postRouter.put("/updatepost/:id", (req, res) => {
  /*console.log("post to update: ", req.body);
  console.log("Post ID", req.params.id);
  res.status(200).json({ msg: `Updated post: ${req.params.id}` });*/
  Post.findByIdAndUpdate(
    req.params.id,
    { title: req.body.title, body: req.body.body },
    (err) => {
      if (err) {
        res.status(500).json({
          msg: {
            msgBody: "An error occured while updating post",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          msg: {
            msgBody: "Post was updated",
            msgError: false,
          },
        });
      }
    }
  );
});

postRouter.delete("/deletepost/:id", (req, res) => {
  Post.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({
        msg: {
          msgBody: "An error occured while deleting post",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        msg: {
          msgBody: "Post was deleted",
          msgError: false,
        },
      });
    }
  });
});

module.exports = postRouter;

//put = findByIdAndUpdate
//delete = findByIdAndDelete
