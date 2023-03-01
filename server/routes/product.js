const express = require("express");
const router = express.Router();
const pool = require("../db");
const bodyParser = require("body-parser");
/// copy of product lot rn not fixed yed
//authentication

//middleware
var urlencodedParser = bodyParser.urlencoded({ extended: true });

//CREATE
router.post("/products", urlencodedParser, async (req, res) => {
  try {
    const product = req.body;
    console.log(product);
    const newProduct =
      await pool.query(`insert into public.product(product_qty, product_name, product_id, notes, serial_no, variant) 
    values('${product.qty}', '${product.name}', '${product.id}', '${product.notes}', '${product.serial_no}', '${product.variant}')`);

    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
  }
});

//GET ALL
router.get("/product/view", urlencodedParser, async (req, res) => {
  try {
    const viewAll = await pool.query("SELECT * FROM public.product");

    res.json(viewAll.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//GET
router.get("/product/view/:id", urlencodedParser, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const viewAll = await pool.query(
      `Select * from public.product where product_id= $1`,
      [id]
    );

    res.json(viewAll.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE
router.put("/product/update/:id", urlencodedParser, async (req, res) => {
  try {
    const { id } = req.params;
    const product = req.body;
    console.log(product);
    const updateProduct = await pool.query(
      `update public.product set product_name = '${product.name}', product_qty = '${product.qty}', notes = '${product.notes}' where product_id = $1`,
      [id]
    );
    res.send("Product was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE
router.delete("/product/delete/:id", urlencodedParser, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      `delete from public.product where product_id = $1`,
      [id]
    );
    res.json("Product was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
