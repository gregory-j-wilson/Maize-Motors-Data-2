const router = require('express').Router()

const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }
  
router.use(cors(corsOptions));
  
  
const Posts = require("./posts-model");
  
const restricted = require("../../auth/authenticate-middleware")


// --------------------------

router.post('/', (req, res) => {
  
    const info = req.body
  
    Posts.add(info)
        .then(post => {
        res.status(201).json({data: post})
        })
        .catch(error => {
        res.status(500).json({error: error.message})
        })
  });




router.get('/', restricted, (req, res) => {

  Posts.find()
      .then(posts => {
          res.status(200).json(posts)
      })

})


router.get('/:id', restricted, (req, res) => {

  const { id } = req.params
  
  Commentary.findById(id)
      .then(post => {
          res.status(200).json(post)
      })

})




router.put('/:id', restricted, (req, res) => {

  const { id } = req.params;
  const changes = req.body;

  Posts.update(changes, id)
        .then(number => {
          res.json({message: `${number} user(s) updated.`})
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to update user' })
        })

})

router.delete('/:id', restricted, (req, res) => {

  const {id} = req.params

  Posts.remove(id)
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