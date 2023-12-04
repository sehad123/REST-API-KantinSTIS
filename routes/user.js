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
router.put("/add-balance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { addedBalance } = req.body;

    const result = await userController.addBalance(id, addedBalance);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

// Route untuk mengupdate saldo pengguna berdasarkan ID
router.put("/update-balance/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  userController
    .updateBalance(id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
