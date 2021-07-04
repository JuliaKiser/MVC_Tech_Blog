const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      attributes: ["id", "title", "post_content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: [
            "id",
            "comment_content",
            "post_id",
            "user_id",
            "created_at",
          ],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((project) => project.get({ plain: true }));
    console.log(posts);
    // Pass serialized data and session flag into template
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login", { loggedIn: req.session.loggedIn });
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
  }
  res.render("signup", { loggedIn: req.session.loggedIn });
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_content", "title", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: [
          "id",
          "comment_content",
          "post_id",
          "user_id",
          "created_at",
        ],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post associated with this id" });
        return;
      }

      //const posts = dbPostData.map((project) => project.get({ plain: true }));
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
