const router = require('express').Router()

const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const cors = require('cors')

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }
  
router.use(cors(corsOptions));
  
  
const Users = require("../database/users-model");
  
const restricted = require("./authenticate-middleware")


// --------------------------

router.post('/register', (req, res) => {
  
    const info = req.body
  
    if (isValid(req.body)) {
  
      const rounds = process.env.BCRYPT_ROUNDS || 8
      const hash = bcryptjs.hashSync(info.password, rounds)
  
      info.password = hash
  
      Users.add(info)
          .then(user => {

            const token = makeJwt(user)
            const user_id = user.id
            res.status(201).json({ token, user_id })
          })
          .catch(error => {
            res.status(500).json({error: error.message})
          })
    } else {
      res.status(400).json({message: 'please provide email and password - password should be alphanumeric'})
    }
  });


router.post('/login', (req, res) => {
  
    const { first_name, last_name, email, password } = req.body
  
    if (isValid(req.body)) {
        Users.findBy({email: email})
            .then(([user]) => {
                // console.log(user)
                if (user && bcryptjs.compareSync(password, user.password)) {
  
                    const token = makeJwt(user)
                    const user_id = user.id;
                    res.status(200).json({ token, user_id })
  
                } else {
                    res.status(401).json({message: "Invalid credentials"})
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({error: error})
            })
    } else {
        res.status(400).json({message: "Please provide your email and password."})
    }
});

router.get('/', restricted, (req, res) => {

  Users.find()
      .then(users => {
          res.status(200).json(users)
      })

})


router.get('/:id', restricted, (req, res) => {

  const { id } = req.params
  
  Users.findById(id)
      .then(user => {
          res.status(200).json(user)
      })

})



router.put('/:id', restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

      Users.update(changes, id)
      .then(changes => {
        res.status(200).json(changes)
      })
      .catch(err => res.status(500).json({ error: err }))
   
});

//-----------------------------------------

function makeJwt(user) {

    const payload = {
        email: user.email,
        id: user.id
    }
  
    const config = {
        jwtSecret: process.env.JWT_SECRET || 'is it secret, is it safe?'
    }
  
    const options = {
        expiresIn: '8 hours'
    }
  
    return jwt.sign(payload, config.jwtSecret, options)
  }
  
  
  
  
  function isValid(user) {
    return Boolean(user.email && user.password && typeof user.password === "string");
  }
  
module.exports = router;