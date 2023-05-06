'use strict';

var response = require('./res');
var connection = require('./koneksi')

exports.index = function(req,res){
    response.ok("aplikasi rest API berjalan",res)
};

//menampilkan semua data mahasiswa
exports.tampilSemuaMahasiswa = function(req,res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows, res);
        }
    })
}