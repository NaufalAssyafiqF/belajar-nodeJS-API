var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

//controller untuk register
exports.registrasi = function(req,res){
    var post = {
        username: req.body.username,
        eamil: req.body.eamil,
        password: md5(req.body.password),
        role: req.body.role,
        tgl_daftar: new Date()
    }

    //setiap ada eamil itu maksudnya email (males ganti nama kolom)
    var query = "SELECT eamil FROM ?? WHERE ??=?";
    var table = ["user", "eamil", post.eamil];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query,table);
                connection.query(query,post,function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("berhasil menambahkan data user baru",res);
                    }
                });
            }else{
                response.ok("email sudah terdaftar!",res)
            }
        }
    })
}