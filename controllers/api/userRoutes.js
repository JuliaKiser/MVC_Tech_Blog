const router = require('express').Router();
const {Post, User, Comment} = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: {exclude: '[password]'}
    }).then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: '[password]'},
        where: {
            id: req.params.id
        },
        include: [{
            model: Post,
            attributes: [
                'id',
                'title',
                'post_content',
                'date_created'
            ]
        },
        {
            model: Comment,
            attributes: [
                'id',
                'comment_content',
                'date_created'
            ],
            include: {
                model: Post,
                attributes: ['title', 'date_created']
            }
        },
        {
            model: Post,
            attributes: ['title', 'date_created'],
        }
    ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});