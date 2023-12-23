import axios from "axios";
import { useEffect, useState } from "react";

function GetAddressApi() {
  const url = "https://provinces.open-api.vn/api/";
  const [addresses, setAddress] = useState();
  useEffect(() => {
    const handleGetAddress = () => {
      axios.get(url).then((res) => {
        setAddress(res.data);
      });
    };
    handleGetAddress();
  }, []);
  return addresses;
}
async function GetProvices() {
  const url = "https://provinces.open-api.vn/api/p";
  const res = await axios.get(url);
  return res;
}
async function GetDistrict(code) {
  const url = `https://provinces.open-api.vn/api/p/${code}?depth=2`;
  const res = await axios.get(url);
  return res;
}
async function GetWard(code) {
  const url = `https://provinces.open-api.vn/api/d/${code}?depth=2`;
  const res = await axios.get(url);
  return res;
}
export { GetAddressApi, GetProvices, GetDistrict, GetWard };
