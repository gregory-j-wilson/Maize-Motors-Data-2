const router = require('express').Router()

const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }
  
router.use(cors(corsOptions));
  
  
const Cars = require("./cars-model");
  
const restricted = require("../../auth/authenticate-middleware")


// --------------------------

router.post('/', (req, res) => {
  
    const car = req.body
  
    Cars.add(car)
        .then(car => {
        res.status(201).json({data: car})
        })
        .catch(error => {
        res.status(500).json({error: error.message})
        })
  });




router.get('/', restricted, (req, res) => {

  Cars.find()
      .then(cars => {
          res.status(200).json(cars)
      })

})


router.get('/:id', restricted, (req, res) => {

  const { id } = req.params
  
  Cars.findById(id)
      .then(car => {
          res.status(200).json(car)
      })

})




router.put('/:id', restricted, (req, res) => {

  const { id } = req.params;
  const changes = req.body;

  Cars.update(changes, id)
        .then(number => {
          res.json({message: `${number} user(s) updated.`})
        })
        .catch(err => {
          res.status(500).json({ message: 'Failed to update user' })
        })

})

router.delete('/:id', restricted, (req, res) => {

  const {id} = req.params

  Cars.remove(id)
  .then(deleted => {
      if (deleted) {
        res.status(200).json({ message: 'Car deleted!' });
      } else {
        res.status(404).json({ message: 'Could not find car with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to delete car because ${err.message}.` });
    });

})


  
module.exports = router;