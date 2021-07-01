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

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({message: 'No user found with that username'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username =dbUserData.username;
            req.session.loggedIn = true;

            res.json({user: dbUserData, message: 'YOU ARE LOGGED IN!!'});
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports =router;