const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const postData = await Post.findAll({
            attributes: [
              'id',
              'title',
              'post_content',
              'data_created'
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
  
      // Serialize data so the template can read it
      const posts = postData.map((project) => Post.get({ plain: true }));
  
      // Pass serialized data and session flag into template
      res.render('homepage', { 
        posts, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    if(req.session.loggin_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    res.render('signup');
  });

  module.exports = router;
    