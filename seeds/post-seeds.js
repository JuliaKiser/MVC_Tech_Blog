const { Post } = require("../models");

const postData = [
  {
    title: "There is still so much to learn",
    post_content: "Web development is no freaking joke.",
    user_id: 1,
  },
  {
    title: "Caleb is the coolest TA out there",
    post_content:
      "Our class would seriously be behind if Caleb was not there to save everyone.",
    user_id: 2,
  },
  {
    title: "OMG",
    post_content: "Christmas should be every month of the year.",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
