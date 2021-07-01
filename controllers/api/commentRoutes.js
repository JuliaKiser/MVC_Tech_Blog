const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll()
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('./:id', (req,res)=> {
  Comment.findAll({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData =>
    res.json(dbCommentData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// this allows a user to create a comment
router.post('/', withAuth, (req, res) => {
  //Check for a session
  if (req.session) {
    Comment.create({
      comment_content: req.body.comment_content,      
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  }
});

// this allows the user to update a comment
router.put('/:id', withAuth, (req,res)=> {
  Comment.update({
    comment_content: req.body.comment_content
  }, {
    where: {
      id: req.params.id
    }
  }).then(dbCommentData => {
    if (!dbCommentData) {
      res.status(404).json({message: 'Comment not associated with this ID'});
      return;
    }
    res.json(dbCommentData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// this allows a user to delete a comment
router.delete('/:id', (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;