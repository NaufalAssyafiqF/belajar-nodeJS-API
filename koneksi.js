var mysql = require('mysql');

//buat koneksi database
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'mahasiswa_nodejs'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('mysql terkoneksi');
});

module.exports = conn;