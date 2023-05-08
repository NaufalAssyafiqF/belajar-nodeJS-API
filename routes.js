'use strict';

module.exports = function(app){
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/tampil')
        .get(jsonku.tampilSemuaMahasiswa);

    app.route('/tampil/:no_mahasiswa')
        .get(jsonku.tampilBersadarkanNim);

    app.route('/tambah')
        .post(jsonku.tambahData);

    app.route('/ubah')
        .put(jsonku.ubahData);

    app.route('/hapus')
        .delete(jsonku.hapusData);

    app.route('/tampil-matakuliah')
        .get(jsonku.tampilGroupMatkul);

        
}