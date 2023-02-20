const express = require("express");
const app = express();
const port = 3002;
const cors = require("cors");
const pool = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const passport = require("passport");

const fs = require("fs");
const path = require("path");
const formidable = require("formidable");

//middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    Headers: "Content-Type, Access-Control-Allow-Headers",
  })
);
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

var urlencodedParser = bodyParser.urlencoded({ extended: true });

//ROUTES

app.use("/authentication", require("./routes/auth"));
app.use("/dashboard", require("./routes/dashboard"));

app.use("/rawmaterial", require("./routes/rawMaterial"));
app.use("/productlot", require("./routes/productLot"));
app.use("/rawmateriallot", require("./routes/rawMaterialLot"));

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

//CREATE
app.post("/products", urlencodedParser, async (req, res) => {
  try {
    const product = req.body;
    console.log(product);
    const newProduct = await pool.query(`insert into public.product(product_qty, product_name, product_id, notes, serial_no, variant) 
    values('${product.qty}', '${product.name}', '${product.id}', '${product.notes}', '${product.serial_no}', '${product.variant}')`);

    res.json(newProduct);
  } catch (err) {
    console.error(err.message);
  }
});

//GET ALL
app.get("/product/view", urlencodedParser, async (req, res) => {
  try {
    const viewAll = await pool.query("SELECT * FROM public.product");

    res.json(viewAll.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//GET
app.get("/product/view/:id", urlencodedParser, async (req, res) => {
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
app.put("/product/update/:id", urlencodedParser, async (req, res) => {
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
app.delete("/product/delete/:id", urlencodedParser, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query(
      `delete from public.product where product_id = $1`,
      [id]
    );
    res.json("Product was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

//FILE UPLOAD
app.post("/api/upload", (req, res, next) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var oldPath = files.test.filepath;
    var newPath = path.join(__dirname, "uploads") + "/" + files.test.name;
    var rawData = fs.readFileSync(oldPath);

    fs.writeFile(newPath, rawData, function(err) {
      if (err) console.log(err);
      return res.send("Successfully uploaded");
    });
  });
});

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3002");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});
