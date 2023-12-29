//const Product = require('../models/product');
const { getAllProducts: getAllProductService, getAllProductsStatic: getAllProductsStaticService } = require('../Services/product')
//console.log("hello")

const getAllProductsStatic = async (req, res) => {

    const products = await getAllProductsStaticService(req)

    res.status(200).json({ products, nbHits: products.length });

};
const getAllProducts = async (req, res) => {


    const products = await getAllProductService(req)
   
  res.status(200).json({ products, nbHits: products.length });


};
module.exports = { getAllProductsStatic, getAllProducts }
