const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

// Fungsi untuk mendapatkan tanggal dalam format yang diinginkan
const getFormattedDate = () => {
  const date = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("id-ID", options); // Menggunakan 'id-ID' untuk format tanggal Indonesia, sesuaikan dengan kebutuhan Anda
};

const transaksiSchema = new Schema({
  idBarang: {
    type: objectId,
  },
  idUser: {
    type: objectId,
  },
  jumlah: {
    type: Number,
  },
  harga: {
    type: Number,
  },
  total: {
    type: Number,
  },
  tanggal: {
    type: String,
    default: getFormattedDate, // Menggunakan fungsi getFormattedDate sebagai nilai default
  },
  status: {
    type: Number,
    default: 0,
  },
  buktiPembayaran: {
    type: String,
  },
});

module.exports = mongoose.model("transaksi", transaksiSchema);
