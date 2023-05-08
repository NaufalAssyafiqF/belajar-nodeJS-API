'use strict';

exports.ok = function (values, res) {
    var data = {
        'status':200,
        'values':values
    };

     res.json(data);
     res.end();
}

//response untuk nested matakuliah
exports.okNested = function(values,res){
    //lakukan akumulasi
    const hasil = values.reduce((akumulasikan,item)=>{
        //tentukan array group
        if(akumulasikan[item.nama]){
            //buat variabel group nama mahasiswa
            const group = akumulasikan[item.nama];
            //cek jika isi array adalah matakuliah
            if(Array.isArray(group.matakuliah)){
                //tambah value kedalam group matkul
                group.matkul.push(item.matkul);
            }else{
                group.matkul = [group.matkul, item.matkul];
            }
        }else{
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status':200,
        'values':hasil
    };

    res.json(data);
    res.end();
}