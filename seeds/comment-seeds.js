const { Comment } = require('../models');

const commentData = [{
    comment_content: "This is comment one from user 1",
    user_id: 1,
    post_id: 1
},
{
    comment_content: "Just some data to fill in the comments",
    user_id: 1,
    post_id: 1
},
{
    comment_content: "here is some more comment content",
    user_id: 1,
    post_id: 1
},
{
    comment_content: "what the heck is with all this commenting",
    user_id: 2,
    post_id: 1
},
{
    comment_content: "Oh look here, another comment",
    user_id: 2,
    post_id: 1
}
]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments