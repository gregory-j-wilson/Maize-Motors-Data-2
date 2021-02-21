const router = require('express').Router()

const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }
  
router.use(cors(corsOptions));
  
  
const CommentsOnPosts = require("./comments_on_posts-model");
  
const restricted = require("../../auth/authenticate-middleware")


// --------------------------

router.post('/', (req, res) => {
  
    const info = req.body
  
    CommentsOnPosts.add(info)
        .then(comment_on_post => {
        res.status(201).json({data: comment_on_post})
        })
        .catch(error => {
        res.status(500).json({error: error.message})
        })
  });




router.get('/', restricted, (req, res) => {

  CommentsOnPosts.find()
      .then(comment_on_post => {
          res.status(200).json(comment_on_post)
      })

})


router.get('/:id', restricted, (req, res) => {

  const { id } = req.params
  
  CommentsOnPosts.findById(id)
      .then(comment_on_post => {
          res.status(200).json(comment_on_post)
      })

})


router.get('/:post_id', restricted, (req, res) => {

  const { post_id } = req.params

  CommentsOnPosts.findByBookChapter(post_id)
      .then(comment_on_post => {
        res.status(200).json(comment_on_post)
      })

})

router.put('/:id', restricted, (req, res) => {

  const { id } = req.params;
  const changes = req.body;

  CommentsOnPosts.update(changes, id)
        .then(number => {
          res.json({message: `${number} user(s) updated.`})
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to update user' })
        })

})

router.delete('/:id', restricted, (req, res) => {

  const {id} = req.params

  CommentsOnPosts.remove(id)
  .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: 'Commentary deleted!' });
      } else {
        res.status(404).json({ message: 'Could not find commentary with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to delete commentary because ${err.message}.` });
    });

})


  
module.exports = router;