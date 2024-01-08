import axios from "axios";
const url = "https://provinces.open-api.vn/api/";
async function GetProvices() {
  const res = await axios.get(`${url}p`);
  return res;
}
async function GetDistrict(code) {
  const res = await axios.get(`${url}p/${code}?depth=2`);
  return res;
}
async function GetWard(code) {
  const res = await axios.get(`${url}d/${code}?depth=2`);
  return res;
}
async function GetProviceByCode(code) {
  const res = await axios.get(`${url}p/${code}`);
  return res;
}
async function GetDistrictByCode(code) {
  const res = await axios.get(`${url}d/${code}`);
  return res;
}
async function GetWardByCode(code) {
  const res = await axios.get(`${url}w/${code}`);
  return res;
}
export {
  GetProvices,
  GetDistrict,
  GetWard,
  GetDistrictByCode,
  GetProviceByCode,
  GetWardByCode,
};
