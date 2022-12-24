const express = require("express");
const products = require("../../models/DM_model/products");

const router = express.Router();

//Save products
router.route("/products/save").post((req, res) => {
  console.log(newProducts);
  newProducts.save((err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }

    return res.status(200).json({
      success: "Product save successfully",
    });
  });
});

//Get products
router.route("/products/displayProducts").get((req, res) => {
  products.find().exec((err, products) => {
    if (err) {
      return (
        res.status(400),
        json({
          error: err,
        })
      );
    }

    return res.status(200).json({
      success: true,
      existingProducts: products,
    });
  });
});

//Get a specific products
router.route("/product/display/:id").get((req, res) => {
  let productID = req.params.id;

  products.findById(productID, (err, products) => {
    if (err) {
      return res.status(400).json({ success: false, err });
    }
    return res.status(200).json({
      success: true,
      products,
    });
  });
});

//Update products
router.route("/product/update/:id").put((req, res) => {
  products.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, products) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      return res.status(200).json({
        success: "Update Successfully",
      });
    }
  );
});

//Delete products
router.route("/product/delete/:id").delete((req, res) => {
  products.findByIdAndRemove(req.params.id).exec((err, deleteProduct) => {
    if (err)
      return res.status(400).json({
        message: "Delete Unsuccessfully",
        err,
      });

    return res.json({
      message: "Delete Successfull",
      deleteProduct,
    });
  });
});

module.exports = router;
