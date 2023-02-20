import axios from "axios";
axios.defaults.withCredentials = false;

export async function onProdBatchSubmit(BatchData) {
  return await axios.post("http://localhost:3002/productlot/add", BatchData);
}

export async function onProdBatchUpdate(BatchData) {
  return await axios.put("http://localhost:3002/productlot/update", BatchData);
}

export async function onProdBatchUpdateRm(BatchData) {
  return await axios.put(
    "http://localhost:3002/productlot/updateRm",
    BatchData
  );
}

export async function onProdSubmit(BatchData) {
  return await axios.post("http://localhost:3002/products", BatchData);
}

export async function onRmnProdSubmit(BatchData, lotno) {
  const body = { rmnprodlot: BatchData, lotno: lotno };
  return await axios.post(
    "http://localhost:3002/productlot/addrmnprodlot",
    body
  );
}

export async function onRmnProdUpdate(BatchData, lotno) {
  const body = { rmnprodlot: BatchData, lotno: lotno };
  return await axios.put(
    "http://localhost:3002/productlot/updatermnprod",
    body
  );
}

export async function showRmnQty(BatchData) {
  return await axios.get(
    "http://localhost:3002/productlot/viewrmnprodlot/".concat(BatchData)
  );
}
