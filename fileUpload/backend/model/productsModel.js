const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    nsnNo : {
        type : String,
        required : [ true, "Lütfen nsn Kodu giriniz"]
    },
    seriNo : {
        type : String,
        required : [ true, "Lütfen Seri No giriniz"]
    },
    name : {
        type : String,
        required : [ true, "Lütfen isim giriniz"]
    },
    aciklama : {
        type : String,
        required : [ true, "Lütfen açıklama giriniz"]
    },
    fileName : {
        type : String,
        required : [ true, "Lütfen file adı giriniz"]
    },
    filePath : {
        type : String,
        required : [ true, "Lütfen file path giriniz"]
    }

});
module.exports  = mongoose.model("Product",ProductSchema);