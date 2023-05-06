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

//menampilkan semua data berdasarkan id
exports.tampilBersadarkanNim = function(req,res){
    let nim = req.params.nim;
    connection.query('SELECT * FROM mahasiswa WHERE nim = ?',[nim],
        function (error, rows, fields) {
            if(error){
                connection.log(error);
            }else{
                response.ok(rows,res);
            }
        }
    )
}