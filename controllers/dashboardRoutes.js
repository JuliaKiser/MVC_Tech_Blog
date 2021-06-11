const router = require('express').Router();
const { Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth')

router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'date_created'
        ],
        include: [{
            model: Comment,
            attributes: [
              'id',
              'comment_content',
              'post_id',
              'user_id',
              'date_created'
            ],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
    });
})
.then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'post_content',
            'date_created'
        ],
        include: [{ 
            model: User,
            attributes: ['username']
           },
           {
            model: Comment,
            attributes: [
                'id',
                'comment_content',
                'post_id',
                'user_id',
                'date_created'
            ]
           }
        ]
    })
.then(dbPostData => {
    if(!dbPostData) {
        res.status(404).json({ message: 'Cannot find post for user'});
        return;
    }
    const post =dbPostData.get({plain:true});
    res.render('edit-post', {
        post,
        loggedIn: req.session.loggedIn
    });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});
