const { Post } = require('../models');

const postData = [{
    title: "There is still so much to learn",
    content: "Web development is no freaking joke.",
    user_id: 1
},
{
    title: "Caleb is the coolest TA out there",
    content: "Our class would seriously be behind if Caleb was not there to save everyone.",
    user_id: 2
},
{
    title: "OMG",
    content: "Christmas should be every month of the year.",
    user_id: 3
}

];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;