const router = require('express').Router()

const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }
  
router.use(cors(corsOptions));
  
  
const Commentary = require("./commentary-model");
  
const restricted = require("../../auth/authenticate-middleware")


// --------------------------

router.post('/', (req, res) => {
  
    const info = req.body
  
    Commentary.add(info)
        .then(commentary => {
        res.status(201).json({data: commentary})
        })
        .catch(error => {
        res.status(500).json({error: error.message})
        })
  });




router.get('/', restricted, (req, res) => {

  Commentary.find()
      .then(commentaries => {
          res.status(200).json(commentaries)
      })

})


router.get('/:id', restricted, (req, res) => {

  const { id } = req.params
  
  Commentary.findById(id)
      .then(chapterCommentary => {
          res.status(200).json(chapterCommentary)
      })

})


router.get('/:book/:chapter', restricted, (req, res) => {

  const { book, chapter } = req.params

  Commentary.findByBookChapter(book, chapter)
      .then(chapterCommentary => {
        res.status(200).json(chapterCommentary)
      })

})

router.put('/:id', restricted, (req, res) => {

  const { id } = req.params;
  const changes = req.body;

  Commentary.update(changes, id)
        .then(number => {
          res.json({message: `${number} user(s) updated.`})
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to update user' })
        })

})

router.delete('/:id', restricted, (req, res) => {

  const {id} = req.params

  Commentary.remove(id)
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