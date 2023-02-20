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
    const raw_material = req.body;
    console.log(raw_material);
    const newRawMaterial =
      await pool.query(`insert into public.raw_material(stock_min_qty, total_qty, raw_material_name, ds_part_no, notes) 
    values('${raw_material.mqty}', '${raw_material.tqty}', '${raw_material.name}', '${raw_material.dspn}', '${raw_material.notes}')`);

    res.json(newRawMaterial);
  } catch (err) {
    console.error(err.message);
  }
});

//GET ALL
router.get("/view", urlencodedParser, async (req, res) => {
  try {
    const viewAll = await pool.query("SELECT * FROM public.raw_material");
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
      `Select * from public.raw_material where ds_part_no= $1`,
      [id]
    );

    res.json(viewAll.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE
router.put("/update/:id", urlencodedParser, async (req, res) => {
  try {
    const { id } = req.params;
    const raw_material = req.body;
    console.log(raw_material);
    const updateRawMaterial = await pool.query(
      `update public.raw_material set raw_material_name = '${raw_material.name}', stock_min_qty = '${raw_material.mqty}', total_qty = '${raw_material.tqty}', notes = '${raw_material.notes}' where ds_part_no = $1`,
      [id]
    );
    res.send("Raw Material was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE
router.delete("/delete/:id", urlencodedParser, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRawMaterial = await pool.query(
      `delete from public.raw_material where ds_part_no= $1`,
      [id]
    );
    res.json("Raw Material was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;