const express = require("express");
const db = require("./data/db");
const router = express.Router();

// GET REQUESTS

router.get("/api/posts", (req, res) => {
  db.find(req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "Bad Request",
      });
    });
});

router.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving the user" });
    });
});

router.get("/api/posts/:id/comments", (req, res) => {
  db.findCommentById(req.params.id)
    .then((comment) => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "The Comment Info couldn't be found" });
    });
});

// POST REQUEST

router.post("/api/posts", (req, res) => {
  if (!req.body.title && req.body.contents) {
    return res.status(400).json({
      errorMessage: "Please provide title and contents",
    });
  }

  db.insert(req.body)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "Bad Post",
      });
    });
});

// router.post("/api/posts/:id/comments", (req, res) => {
//     if(req.body.title)
// });

// Put Request

router.put("/api/posts/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res
      .status(400)
      .json({ message: "Please give a title and contents" });
  }

  db.update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Can't find this user",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Can't update user" });
    });
});

// DELETE

router.delete("/api/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({
          message: "BAI post",
        });
      } else {
        res
          .status(404)
          .json({ message: "You can't delete that which does not exist" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "Couldn't delete post",
      });
    });
});

module.exports = router;
