import axios from "axios";
async function AddressToCoordinate(address) {
  const apiKey = "LFt8YRCK0YooRIwnzNlAFKIt2nOBVVyKBPpLMgPn";
  let coordinate = null;
  const convertAddressToCoordinate = async (address) => {
    const url = `https://rsapi.goong.io/geocode?address=${address}&api_key=${apiKey}`;
    await axios
      .get(url)
      .then((res) => (coordinate = res.data.results[0].geometry.location));
    return coordinate;
  };
  return await convertAddressToCoordinate(address);
}
async function generateCoordinate(listAddress) {
  if (listAddress.length > 0) {
    let listCoordinate = [];
    await listAddress.map(async (item) => {
      let stringCoordinate = await AddressToCoordinate(item.address)
        .then((res) => {
          return `${res.lat},${res.lng}`;
        })
        .catch((error) => console.log(error));
      listCoordinate.push({ value: stringCoordinate.toString(), id: item.id });
      return;
    });

    return listCoordinate;
  }
}
async function CompareAddress(addressStart, listAddress) {
  let coordinate = {};
  let coordinateList = [];
  let result = null;

  const apiKey = "LFt8YRCK0YooRIwnzNlAFKIt2nOBVVyKBPpLMgPn";
  await generateCoordinate(listAddress)
    .then((res) => (coordinateList = res))
    .catch((error) => console.log(error));
  await AddressToCoordinate(addressStart)
    .then((res) => {
      let stringCoordinate = `${res.lat},${res.lng}`;
      return (coordinate = stringCoordinate);
    })
    .catch((error) => console.log(error));

  const handleCompare = async () => {
    if (coordinateList.length > 0 && coordinate != null) {
      const arrToUrl = [];
      coordinateList.sort((a, b) => a.id - b.id);
      coordinateList.map((item) => arrToUrl.push(item.value));
      const url = `https://rsapi.goong.io/DistanceMatrix?origins=${coordinate}&destinations=${arrToUrl.join(
        "|"
      )}&vehicle=car&api_key=${apiKey}`;
      await axios.get(url).then((res) => (result = res.data.rows[0].elements));
      return { data: result, listOrigin: coordinateList };
    }
  };
  return await handleCompare();
}

export { CompareAddress };
