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
  let nim = req.params.nim;
  connection.query(
    "SELECT * FROM mahasiswa WHERE nim = ?",
    [nim],
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
  var no = req.body.no;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query(
    "INSERT INTO mahasiswa (no,nim,nama,jurusan) VALUES(?,?,?,?)",
    [no, nim, nama, jurusan],
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
  var no = req.body.no;
  var nim = req.body.nim;
  var nama = req.body.nama;
  var jurusan = req.body.jurusan;

  connection.query(
    "UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE no=?",
    [nim, nama, jurusan, no],
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
exports.hapusData = function (req,res){
  var nim = req.body.nim;

  connection.query(
    "DELETE FROM mahasiswa WHERE nim=?",
    [nim],
    function (error, rows, fields){
      if(error){
        console.log(error);
      }else{
        response.ok("berhasil menghapus data mahasiswa", res);
      }
    }
  )
}
