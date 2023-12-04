// const userModel = require('../models/user')
// const bcrypt = require('bcrypt')

// exports.register = (data) =>
//     new Promise((resolve, reject) => {
//         userModel.findOne({
//             username: data.username
//         }).then(user => {
//             if (user) {
//                 reject({
//                     sukses: false,
//                     msg: 'Username Telah Terdaftar'
//                 })
//             } else {
//                 bcrypt.hash(data.password, 10, (err, hash) => {
//                     data.password = hash
//                     userModel.create(data)
//                     .then(() => resolve({
//                         sukses: true,
//                         msg: 'Berhasil Registrasi'
//                     })).catch(() => reject({
//                         sukses: false,
//                         msg: 'Gagal Registrasi'
//                     }))
//                 })
//             }
//         })
//     })

// exports.login = (data) =>
//     new Promise((resolve, reject) => {
//         userModel.findOne({
//             username: data.username
//         }).then(user => {
//             if (user) {
//                 if (bcrypt.compareSync(data.password, user.password)) {
//                     resolve({
//                         sukses: true,
//                         msg: 'Berhasil Login',
//                         data: user
//                     })
//                 } else {
//                     reject({
//                         sukses: false,
//                         msg: 'Password Anda Salah'
//                     })
//                 }
//             } else {
//                 reject({
//                     sukses: false,
//                     msg: 'Username Tidak Terdaftar'
//                 })
//             }
//         })
//     })

const userModel = require("../models/user");
const bcrypt = require("bcrypt");

// ... (kode yang sudah ada sebelumnya)

exports.uploadFoto = (id, data) =>
  new Promise((resolve, reject) => {
    userModel
      .updateOne({ _id: id }, { $set: data })
      .then(() => {
        resolve({
          sukses: true,
          msg: "Berhasil upload foto",
        });
      })
      .catch(() => {
        reject({
          sukses: false,
          msg: "Gagal upload foto",
        });
      });
  });

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        username: data.username,
      })
      .then((user) => {
        if (user) {
          reject({
            sukses: false,
            msg: "Username Telah Terdaftar",
          });
        } else {
          bcrypt.hash(data.password, 10, (err, hash) => {
            data.password = hash;
            userModel
              .create(data)
              .then(() =>
                resolve({
                  sukses: true,
                  msg: "Berhasil Registrasi",
                })
              )
              .catch(() =>
                reject({
                  sukses: false,
                  msg: "Gagal Registrasi",
                })
              );
          });
        }
      });
  });

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({
        username: data.username,
      })
      .then((user) => {
        if (user) {
          if (bcrypt.compareSync(data.password, user.password)) {
            resolve({
              sukses: true,
              msg: "Berhasil Login",
              data: user,
            });
          } else {
            reject({
              sukses: false,
              msg: "Password Anda Salah",
            });
          }
        } else {
          reject({
            sukses: false,
            msg: "Username Tidak Terdaftar",
          });
        }
      });
  });

// Method untuk mendapatkan user berdasarkan ID
exports.getById = (id) =>
  new Promise((resolve, reject) => {
    userModel
      .findById(id)
      .then((user) => {
        if (user) {
          resolve({
            sukses: true,
            msg: "Data User Ditemukan",
            data: user,
          });
        } else {
          reject({
            sukses: false,
            msg: "Data User Tidak Ditemukan",
          });
        }
      })
      .catch((err) =>
        reject({
          sukses: false,
          msg: "Terjadi Kesalahan pada Server",
        })
      );
  });

// Method untuk mengedit data user berdasarkan ID
exports.edit = (id, newData) =>
  new Promise((resolve, reject) => {
    userModel
      .findByIdAndUpdate(id, newData)
      .then(() =>
        resolve({
          sukses: true,
          msg: "Data User Berhasil Diubah",
        })
      )
      .catch(() =>
        reject({
          sukses: false,
          msg: "Gagal Mengubah Data User",
        })
      );
  });

// Method untuk mengubah password
exports.changePassword = (id, oldPassword, newPassword) =>
  new Promise((resolve, reject) => {
    userModel
      .findById(id)
      .then((user) => {
        if (user) {
          bcrypt.compare(oldPassword, user.password, (err, result) => {
            if (result) {
              bcrypt.hash(newPassword, 10, (err, hash) => {
                if (err) {
                  reject({
                    sukses: false,
                    msg: "Gagal mengubah password",
                  });
                } else {
                  userModel
                    .findByIdAndUpdate(id, { $set: { password: hash } })
                    .then(() =>
                      resolve({
                        sukses: true,
                        msg: "Berhasil mengubah password",
                      })
                    )
                    .catch(() =>
                      reject({
                        sukses: false,
                        msg: "Gagal mengubah password",
                      })
                    );
                }
              });
            } else {
              reject({
                sukses: false,
                msg: "Password lama Anda salah",
              });
            }
          });
        } else {
          reject({
            sukses: false,
            msg: "User tidak ditemukan",
          });
        }
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Terjadi kesalahan pada server",
        })
      );
  });

// Method untuk menambah saldo
exports.addBalance = (id, addedBalance) =>
  new Promise((resolve, reject) => {
    userModel
      .findById(id)
      .then((user) => {
        if (user) {
          const currentBalance = user.saldo || 0; // Ambil saldo saat ini, jika tidak ada, gunakan 0
          const newBalance = currentBalance + addedBalance; // Hitung saldo baru

          userModel
            .findByIdAndUpdate(id, { $set: { saldo: newBalance } })
            .then(() =>
              resolve({
                sukses: true,
                msg: `Saldo berhasil ditambahkan. Saldo sekarang: ${newBalance}`,
              })
            )
            .catch(() =>
              reject({
                sukses: false,
                msg: "Gagal menambah saldo",
              })
            );
        } else {
          reject({
            sukses: false,
            msg: "User tidak ditemukan",
          });
        }
      })
      .catch(() =>
        reject({
          sukses: false,
          msg: "Terjadi kesalahan pada server",
        })
      );
  });

// Method untuk mengupdate saldo pengguna berdasarkan ID
exports.updateBalance = (id, data) =>
  new Promise((resolve, reject) => {
    userModel
      .updateOne({ _id: id }, { $set: data })
      .then(() => {
        resolve({
          sukses: true,
          msg: "Berhasil Update saldo",
        });
      })
      .catch(() => {
        reject({
          sukses: false,
          msg: "Gagal update saldo",
        });
      });
  });
