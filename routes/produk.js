const router = require("express").Router();
const produkController = require("../controllers/produkController");
const uploadConfig = require("../uploadConfig");
const fields = uploadConfig.upload.fields([
  {
    name: "gambar",
    maxCount: 1,
  },
]);

router.post("/create", fields, (req, res) => {
  req.body.gambar = req.files.gambar[0].filename;
  produkController
    .create(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.put("/edit/:id", fields, (req, res) => {
  const gambar = uploadConfig.cekNull(req.files.gambar);
  let data = req.body;
  if (gambar) {
    data.gambar = gambar;
  } else {
    delete data.gambar;
  }
  console.log(data);
  produkController
    .edit(req.params.id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getall", (req, res) => {
  produkController
    .getData()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.get("/getbyid/:id", (req, res) => {
  console.log(req.params.id);
  produkController
    .getById(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

router.delete("/hapus/:id", (req, res) => {
  produkController
    .delete(req.params.id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Route baru untuk update qty
router.put("/updateqty/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;

  produkController
    .updateQty(id, data)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

module.exports = router;
