const Product = require("../model/productsModel")
const errorWrapper = require("../errorWrapper")

const addNewProduct = errorWrapper(async (req, res, next) => {
  const information = req.body;
  const file = req.files.file;
  const newProduct = {
    nsnNo: information.nsnNo,
    seriNo: information.seriNo,
    name: information.name,
    aciklama: information.aciklama,
    fileName: file.name,
    filePath: `/uploads/${file.name}`
  }
  const product = await Product.create({
    ...newProduct
  });
  res.status(200)
    .json({
      success: true,
      message: product
    })



  await file.mv(`${__dirname}/../client/public/uploads/${file.name}`, err => {
  

  });

});

module.exports = {
  addNewProduct
};