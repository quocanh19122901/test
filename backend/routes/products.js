const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const Product = require("../models/Products");
const router = require("express").Router();
const cors = require("cors");
router.use(cors());
//CREATE
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  const existingProduct = await Product.findOne({
    productName: newProduct.productName,
  });

  if (existingProduct) {
    return res
      .status(409)
      .json({ error: "Product with the same name already exists." });
  }

  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL PRODUCT
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: 1 }).limit(100);
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
