const express = require("express");
const router = express.Router();
const pool = require("../db");
const bodyParser = require("body-parser");

//authentication

//middleware
var urlencodedParser = bodyParser.urlencoded({ extended: true });

//CREATE
router.post("/add", urlencodedParser, async (req, res) => {
  try {
    const product_lot = req.body;
    // console.log(product_lot);
    const newProductLot = await pool.query(`insert into public.product_lot(product_id, lot_no, status, notes, expiry_date, qty)
    values('${product_lot.id}', '${product_lot.lotno}', '${product_lot.status}', '${product_lot.notes}', '${product_lot.edate}', '${product_lot.qty}')`);
    console.log("new prd lot in post", newProductLot);
    res.json(product_lot);
  } catch (err) {
    console.error(err.message);
  }
});

//GET ALL
router.get("/view", urlencodedParser, async (req, res) => {
  try {
    const viewAll = await pool.query(
      "SELECT lot_no, status, notes, product_id, TO_CHAR(expiry_date,'dd/mm/yyyy') expiry_date, qty FROM public.product_lot"
    );
    res.json(viewAll.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//GET
router.get("/view/:id", urlencodedParser, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const viewAll = await pool.query(
      `SELECT * FROM public.product_lot WHERE product_id = $1`,
      [id]
    );

    res.json(viewAll.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE RMN
router.put("/updateRm", urlencodedParser, async (req, res) => {
  try {
    console.log("entered");
    const request = req.body;
    console.log(request);
    for (let i = 0; i < request.length; i++) {
      console.log("loop");
      rmn = request[i]["rmn"];
      qty = request[i]["qty"];
      console.log(rmn);
      console.log(qty);
      await pool.query(
        `UPDATE public.raw_material_lot SET qty = qty - '${qty}' WHERE rmn = '${rmn}'`
      );
    }
    console.log("exit");
    res.send("Product Lot was updated!");
    console.log("sent");
  } catch (err) {
    console.log("err");
    console.error(err.message);
  }
});

//CREATE RAW MATERIAL OF PRODUCT LOT
router.post("/addrmnprodlot", urlencodedParser, async (req, res) => {
  try {
    console.log("entered");
    const rmnprodlot = req.body["rmnprodlot"];
    const lotno = req.body["lotno"];
    console.log("read");
    console.log("AHHHHHHHHHHHHH ", rmnprodlot);
    for (let i = 0; i < rmnprodlot.length; i++) {
      console.log("loop");
      rmnprod = rmnprodlot[i];
      await pool.query(
        `insert into public.raw_materials_of_product(rmn, qty, lot_no) values('${rmnprod["rmn"]}', '${rmnprod["qty"]}', '${lotno}')`
      );
    }
    console.log("end");
    res.json(rmnprodlot);
  } catch (err) {
    console.log("error\n\n\n\nerror");
    console.error(err.message);
  }
});

//GET ALL RAW MATERIAL OF PRODUCT LOT
router.get("/viewrmnprodlot", urlencodedParser, async (req, res) => {
  try {
    const viewRMN = await pool.query(
      "SELECT rmn, qty, lot_no FROM public.raw_materials_of_product"
    );
    res.json(viewRMN.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//VIEW RAW MATERIAL OF PRODUCT LOT
router.get("/viewrmnprodlot/:lotno", urlencodedParser, async (req, res) => {
  try {
    const { lotno } = req.params;
    //const { lotno } = req.body;
    console.log(lotno);
    const viewAll = await pool.query(
      `SELECT rmn, qty FROM public.raw_materials_of_product WHERE lot_no = $1`,
      [lotno]
    );

    res.json(viewAll.rows);
    console.log(viewAll.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE
router.put("/update", urlencodedParser, async (req, res) => {
  try {
    const { lotno } = req.body;
    const product_lot = req.body;
    console.log(product_lot);
    await pool.query(
      `update public.product_lot set status = '${product_lot["status"]}', notes = '${product_lot["notes"]}',expiry_date = '${product_lot["edate"]}', qty = '${product_lot["qty"]}' where lot_no = $1`,
      [lotno]
    );
    res.send("Product Lot was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// VUPDATE RMN PRODUCT LOT
router.put("/updatermnprod", urlencodedParser, async (req, res) => {
  try {
    const { lotno, rmnprodlot } = req.body;
    console.log(lotno);
    console.log(rmnprodlot);
    await pool.query(
      `delete from public.raw_materials_of_product where lot_no = $1`,
      [lotno]
    );
    for (const rmnprod of rmnprodlot) {
      await pool.query(
        `insert into public.raw_materials_of_product(rmn, qty, lot_no) values($1,$2,$3)`,
        [rmnprod["rmn"], rmnprod["qty"], lotno]
      );
    }

    res.send("RMN of Product Lot was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE
router.delete("/delete/:id", urlencodedParser, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      `delete from public.raw_materials_of_product where lot_no= $1`,
      [id]
    );
    await pool.query(`delete from public.product_lot where lot_no= $1`, 
      [id]
    );
    res.json("Product Lot was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
