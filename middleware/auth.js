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

//controller untuk login
exports.login = function(req,res){
    var post = {
        password: req.body.password,
        eamil : req.body.eamil
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user","password",md5(post.password),"eamil",post.eamil];

    query = mysql.format(query,table);
    connection.query(query,function(error,rows){
        if(error){
            console.log(error);
        }else{
            if(rows.length == 1){
                var token = jwt.sign({rows},config.secret,{
                    expiresIn: 1440
                })
                id_user = rows[0].id;

                var data = {
                    id_user: id_user,
                    accsess_token: token,
                    ip_adress: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["akses_token"];

                query = mysql.format(query,table);
                connection.query(query,data,function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                        res.json({
                            success: true,
                            message:'Token JWT tergenerate',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            }else{
                res.json({"Error": true, "Message":"Email atau password salah!"})
            }
        }
    });
}







