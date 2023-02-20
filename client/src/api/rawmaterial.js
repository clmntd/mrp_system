import axios from "axios";
axios.defaults.withCredentials = false;

export async function onRmBatchSubmit(BatchData) {
  return await axios.post(
    "http://localhost:3002/rawmateriallot/add",
    BatchData
  );
}

export async function onRmSubmit(BatchData) {
  return await axios.post("http://localhost:3002/rawmaterial/add", BatchData);
}
export async function onRmBatchUpdate(BatchData) {
  return await axios.put(
    "http://localhost:3002/rawmateriallot/update",
    BatchData
  );
}

export async function onRmDelete(BatchData) {
  return await axios.post(
    "http://localhost:3002/rawmaterial/delete",
    BatchData
  );
}

export async function onRmBatchDelete(BatchData) {
  return await axios.delete(
    "http://localhost:3002/rawmateriallot/delete",
    BatchData
  );
}
