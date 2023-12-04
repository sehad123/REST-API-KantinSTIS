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
const uploadConfig = require("../uploadConfig");
const fields = uploadConfig.upload.fields([
  {
    name: "gambar",
    maxCount: 1,
  },
]);

router.post("/register", (req, res) => {
  userController
    .register(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/upload-foto/:id", fields, (req, res) => {
  req.body.buktiPembayaran = req.files.buktiPembayaran[0].filename;

  userController
    .uploadFoto(req.params.id, req.body)
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

// Route untuk mengubah password
router.put("/change-password/:id", (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  userController
    .changePassword(id, oldPassword, newPassword)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Route untuk menambah saldo
router.put("/add-balance/:id", (req, res) => {
  const { id } = req.params;
  const { saldo } = req.body;

  userController
    .tambahSaldo(id, saldo)
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
