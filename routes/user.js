// const router = require('express').Router()
// const userController = require('../controllers/userController')

// router.post('/register', (req,res) => {
//     userController.register(req.body)
//         .then(result => res.json(result))
//         .catch(err => res.json(err))
// })

// router.post('/login', (req,res) => {
//     userController.login(req.body)
//         .then(result => res.json(result))
//         .catch(err => res.json(err))
// })

// module.exports = router

const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/register", (req, res) => {
  userController
    .register(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.post("/login", (req, res) => {
  userController
    .login(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Endpoint untuk mendapatkan user berdasarkan ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  userController
    .getById(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Endpoint untuk mengedit data user berdasarkan ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  userController
    .edit(id, newData)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
