import { useParams } from "react-router-dom";

export default function DetailAddressStore() {
  const { id: id } = useParams();
  return <div>Address store {id}</div>;
}
