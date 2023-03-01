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
    const raw_material_lot = req.body;
    console.log(raw_material_lot);
    const newRawMaterialLot = await pool.query(`insert into public.raw_material_lot(rmn, qty, notes, qr_code, status, expiry_date, ds_part_no) 
    values('${raw_material_lot.rmn}', '${raw_material_lot.qty}', '${raw_material_lot.notes}', '${raw_material_lot.qr}', '${raw_material_lot.status}', '${raw_material_lot.expiry_date}', '${raw_material_lot.dspn}')`);

    res.json(newRawMaterialLot);
  } catch (err) {
    console.error(err.message);
  }
});

//GET ALL
router.get("/view", urlencodedParser, async (req, res) => {
  try {
    const viewAll = await pool.query(
      "SELECT rmn, qty, notes, qr_code, status, TO_CHAR(expiry_date,'dd/mm/yyyy') expiry_date, ds_part_no FROM public.raw_material_lot"
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
      `Select rmn, qty, notes, qr_code, status, TO_CHAR(expiry_date,'dd/mm/yyyy') expiry_date, ds_part_no from public.raw_material_lot where rmn= $1`,
      [id]
    );
    res.json(viewAll.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE
router.put("/update", urlencodedParser, async (req, res) => {
  try {
    const { rmn } = req.body;
    const raw_material_lot = req.body;
    console.log(raw_material_lot);
    const updateRawMaterialLot = await pool.query(
      `update public.raw_material_lot set qty = '${raw_material_lot.qty}', notes = '${raw_material_lot.notes}', status = '${raw_material_lot.status}', expiry_date = '${raw_material_lot.expiry_date}' where rmn = $1`,
      [rmn]
    );
    res.send("Raw Material Lot was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE
router.delete("/delete/:id", urlencodedParser, async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      `delete from public.raw_materials_of_product where rmn= $1`,
      [id]
    );
    await pool.query(`delete from public.raw_material_lot where rmn= $1`,
      [id]
    );
    res.json("Raw Material Lot was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
