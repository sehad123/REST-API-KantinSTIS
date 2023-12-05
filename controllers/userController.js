const userModel = require("../models/user");
const bcrypt = require("bcrypt");

exports.deleteProfilePicture = (id) =>
  new Promise((resolve, reject) => {
    userModel
      .findById(id)
      .then((user) => {
        if (!user) {
          reject({
            success: false,
            message: "User tidak ditemukan",
          });
        } else {
          // Hapus foto profil dari direktori atau storage yang diinginkan
          // Misalnya, menghapus gambar dari direktori atau menghapus path gambar dari database

          // Reset path gambar ke gambar default (user.png)
          user.profilePicture = "/path/to/default/image.png";

          user
            .save()
            .then(() =>
              resolve({
                success: true,
                message: "Foto profil berhasil dihapus",
              })
            )
            .catch(() =>
              reject({
                success: false,
                message: "Gagal menghapus foto profil",
              })
            );
        }
      })
      .catch(() =>
        reject({
          success: false,
          message: "Terjadi kesalahan pada server",
        })
      );
  });

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
          const currentBalance = user.saldo || 0;
          const newBalance = currentBalance + addedBalance;

          userModel
            .findByIdAndUpdate(id, { $set: { saldo: newBalance } })
            .then(() =>
              resolve({
                success: true,
                message: `Saldo berhasil ditambahkan. Saldo sekarang: ${newBalance}`,
              })
            )
            .catch(() =>
              reject({
                success: false,
                message: "Gagal menambah saldo",
              })
            );
        } else {
          reject({
            success: false,
            message: "User tidak ditemukan",
          });
        }
      })
      .catch(() =>
        reject({
          success: false,
          message: "Terjadi kesalahan pada server",
        })
      );
  });

exports.minusBalance = (id, addedBalance) =>
  new Promise((resolve, reject) => {
    userModel
      .findById(id)
      .then((user) => {
        if (user) {
          const currentBalance = user.saldo || 0;
          const newBalance = currentBalance - addedBalance;

          userModel
            .findByIdAndUpdate(id, { $set: { saldo: newBalance } })
            .then(() =>
              resolve({
                success: true,
                message: `Saldo berhasil ditambahkan. Saldo sekarang: ${newBalance}`,
              })
            )
            .catch(() =>
              reject({
                success: false,
                message: "Gagal menambah saldo",
              })
            );
        } else {
          reject({
            success: false,
            message: "User tidak ditemukan",
          });
        }
      })
      .catch(() =>
        reject({
          success: false,
          message: "Terjadi kesalahan pada server",
        })
      );
  });

// Method untuk mengupdate saldo pengguna berdasarkan ID
exports.updateBalance = (id, data) =>
  new Promise((resolve, reject) => {
    userModel
      .findByIdAndUpdate(id, { $set: data })
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

// Method untuk memeriksa apakah username ada dalam database
exports.checkUsername = (username) =>
  new Promise((resolve, reject) => {
    userModel
      .findOne({ username: username })
      .then((user) => {
        if (!user) {
          reject({
            success: false,
            message: "Username tidak terdaftar",
          });
        } else {
          resolve({
            success: true,
            message: "Username ditemukan",
            data: user,
          });
        }
      })
      .catch(() =>
        reject({
          success: false,
          message: "Terjadi kesalahan pada server",
        })
      );
  });

// Method untuk mengubah password user
exports.gantiPassword = (id, newPassword) =>
  new Promise((resolve, reject) => {
    bcrypt.hash(newPassword, 10, (err, hash) => {
      if (err) {
        reject({
          success: false,
          message: "Gagal mengubah password",
        });
      } else {
        userModel
          .findByIdAndUpdate(id, { $set: { password: hash } })
          .then(() =>
            resolve({
              success: true,
              message: "Berhasil mengubah password",
            })
          )
          .catch(() =>
            reject({
              success: false,
              message: "Gagal mengubah password",
            })
          );
      }
    });
  });

// Method untuk memeriksa apakah email sesuai dengan ID pengguna
exports.checkEmailById = (id, email) => {
  return new Promise((resolve, reject) => {
    userModel
      .findById(id)
      .then((user) => {
        if (!user) {
          reject({
            success: false,
            message: "User tidak ditemukan",
          });
        } else {
          // Memeriksa apakah email pada data pengguna sesuai dengan email yang diberikan
          if (user.email === email) {
            resolve({
              success: true,
              message: "Email sesuai dengan ID pengguna",
              userId: user._id, // Mengirimkan user ID jika email sesuai
            });
          } else {
            reject({
              success: false,
              message: "Email tidak sesuai dengan ID pengguna",
            });
          }
        }
      })
      .catch((error) => {
        reject({
          success: false,
          message: "Terjadi kesalahan pada server",
          error: error.message, // Mengirimkan pesan kesalahan dari MongoDB
        });
      });
  });
};
