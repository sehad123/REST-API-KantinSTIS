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
  req.body.gambar = req.files.gambar[0].filename;
  userController
    .uploadFoto(req.params.id, req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/", (req, res) => {
  userController
    .getAllUsers()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/delete-foto/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userController.deleteProfilePicture(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
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
router.put("/minus-balance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { addedBalance } = req.body;

    const result = await userController.minusBalance(id, addedBalance);

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

// Endpoint untuk lupa password
router.post("/forgot-password", (req, res) => {
  const { username } = req.body;

  userController
    .checkUsername(username)
    .then((result) => {
      if (result.success) {
        res.json(result);
      } else {
        res.status(404).json(result);
      }
    })
    .catch((err) => res.status(500).json(err));
});

// Route untuk mengubah password setelah memeriksa username
router.put("/reset-password/:id", (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;

  userController
    .gantiPassword(id, newPassword)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// / Route untuk memeriksa email berdasarkan ID pengguna
router.post("/check-email/:id", async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const result = await userController.checkEmailById(id, email);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
