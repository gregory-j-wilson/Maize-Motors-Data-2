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


  
module.exports = router;