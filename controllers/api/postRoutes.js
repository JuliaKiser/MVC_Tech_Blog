const router = require('express').Router();
const {Post, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
   Post.findAll({
       attributes: [
           'id',
           'title',
           'post_content',
           'date_created',
       ],
       order: [
           ['date_created', 'DESC']
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
               'date_created'],
            include: {
                model: User,
                attributes: ['username']
            }
       }
    ]
   })
   .then(dbPostData => res.json(dbPostData.reverse()))
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});
router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'post_content',
                'title',
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
                        'date_created'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post associated with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req,res) => {
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
    then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req,res) => {
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
    }, {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if(!dbPostData){
            res.status(404).json({message: 'No post found associated to this ID'});
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete()
