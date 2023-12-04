const produkModel = require("../models/produk");

exports.create = (data) =>
  new Promise((resolve, reject) => {
    produkModel
      .create(data)
      .then(() => {
        resolve({
          sukses: true,
          msg: "Berhasil Menyimpan Data",
        });
      })
      .catch((e) => {
        console.log(e);
        reject({
          sukses: false,
          msg: "Gagal Menyimpan Data",
        });
      });
  });

exports.updateQty = (id, data) =>
  new Promise((resolve, reject) => {
    produkModel
      .updateOne({ _id: id }, { $set: data })
      .then(() =>
        resolve({
          sukses: true,
          msg: "Berhasil Update Qty Produk",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Gagal Update Qty Produk",
        })
      );
  });

exports.getData = () =>
  new Promise((resolve, reject) => {
    produkModel
      .find({})
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Berhasil Mengambil Data",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Gagal Mengmabil Data",
          data: [],
        })
      );
  });

exports.getById = (id) =>
  new Promise((resolve, reject) => {
    produkModel
      .findOne({
        _id: id,
      })
      .then((res) => {
        resolve({
          sukses: true,
          msg: "Berhasil Mengambil Data",
          data: res,
        });
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Gagal Mengmabil Data",
          data: {},
        })
      );
  });

exports.edit = (id, data) =>
  new Promise((resolve, reject) => {
    produkModel
      .updateOne(
        {
          _id: id,
        },
        data
      )
      .then(() =>
        resolve({
          sukses: true,
          msg: "Berhasil Edit Data",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Gagal Edit Data",
        })
      );
  });

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    produkModel
      .deleteOne({
        _id: id,
      })
      .then(() =>
        resolve({
          sukses: true,
          msg: "Berhasil Hapus Data",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Gagal Hapus Data",
        })
      );
  });
