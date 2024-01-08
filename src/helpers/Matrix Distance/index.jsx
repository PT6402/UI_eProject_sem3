import { useEffect, useState } from "react";
import { CompareAddress } from "./Api";

export default function MatrixDistance() {
  const [result, setResult] = useState();
  const [addressShort, setAddressShort] = useState(null);
  const addressUser =
    "94,tân thới nhất 05,phường Tân Thới Nhất,quận 12,thành phố Hồ Chí Minh";

  const addressStore = [
    {
      id: 0,
      address:
        "121 Hoàng Hoa Thám, Phường 6, Bình Thạnh, Thành phố Hồ Chí Minh, Việt Nam",
    },
    {
      id: 1,
      address:
        "462 Đ. Nguyễn Thị Minh Khai, Phường 2, Quận 3, Thành phố Hồ Chí Minh, Việt Nam",
    },
    {
      id: 2,
      address:
        "391 Đ. Nam Kỳ Khởi Nghĩa, Phường 8, Quận 3, Thành phố Hồ Chí Minh, Việt Nam",
    },
  ];
  const handleShortestDistance = async () => {
    await CompareAddress(addressUser, addressStore).then((res) =>
      setResult(res)
    );
  };
  useEffect(() => {
    if (result != null) {
      const arrChenk = [];
      result.data.map((x) => arrChenk.push(x.distance.value));
      const valueShortest = Math.min(...arrChenk);
      const addressShortest = arrChenk.findIndex(
        (value) => value == valueShortest
      );
      console.log(addressStore.find(({ id }) => id == addressShortest));
      setAddressShort(
        addressStore.find(({ id }) => id == addressShortest).address
      );
    }
  }, [result]);
  return (
    <div>
      <button
        onClick={() => handleShortestDistance()}
        style={{ color: "white" }}>
        Let go
      </button>
      <button onClick={() => setAddressShort(null)} style={{ color: "white" }}>
        reset
      </button>
      <div>{addressShort != null && addressShort}</div>
    </div>
  );
}
