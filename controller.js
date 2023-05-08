"use strict";

var response = require("./res");
var connection = require("./koneksi");
const { query } = require("express");

exports.index = function (req, res) {
  response.ok("aplikasi rest API berjalan", res);
};

//menampilkan semua data mahasiswa
exports.tampilSemuaMahasiswa = function (req, res) {
  connection.query("SELECT * FROM mahasiswa", function (error, rows, fields) {
    if (error) {
      connection.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan semua data berdasarkan id
exports.tampilBersadarkanNim = function (req, res) {
  var no_mahasiswa = req.params.no_mahasiswa;
  connection.query(
    "SELECT * FROM mahasiswa WHERE no_mahasiswa = ?",
    [no_mahasiswa],
    function (error, rows, fields) {
      if (error) {
        connection.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//menambahkan data mahasiswa
exports.tambahData = function (req, res) {
  // var no_mahasiswa = req.body.no_mahasiswa;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query(
    "INSERT INTO mahasiswa (nama,nim,jurusan) VALUES(?,?,?)",
    [nama, nim, jurusan],
    function (error, rows, fields) {
      if (error) {
        connection.log(error);
      } else {
        response.ok("berhasil menambahkan data", res);
      }
    }
  );
};

//mengubah data berdasarkan no
exports.ubahData = function (req, res) {
  var no_mahasiswa = req.body.no_mahasiswa;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query(
    "UPDATE mahasiswa SET nama=?, nim=?, jurusan=? WHERE no_mahasiswa=?",
    [nama, nim, jurusan, no_mahasiswa],
    function (error, rows, fields) {
      if (error) {
        connection.log(error);
      } else {
        response.ok("berhasil mengubah data", res);
      }
    }
  );
};

//menghapus data mahasiswa berdasarkan nim
exports.hapusData = function (req, res) {
  var nim = req.body.nim;

  connection.query(
    "DELETE FROM mahasiswa WHERE nim=?",
    [nim],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("berhasil menghapus data mahasiswa", res);
      }
    }
  );
};

//menampilkan matakuliah group
exports.tampilGroupMatkul = function (req, res) {
  connection.query(
    "SELECT mahasiswa.no_mahasiswa, mahasiswa.nim, mahasiswa.nama, mahasiswa.jurusan, matakuliah.matkul, matakuliah.sks FROM krs JOIN matakuliah JOIN mahasiswa WHERE krs.no_matakuliah = matakuliah.no_matakuliah AND krs.no_mahasiswa = mahasiswa.no_mahasiswa ORDER BY mahasiswa.no_mahasiswa;",
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.okNested(rows, res);
      }
    }
    );
};
