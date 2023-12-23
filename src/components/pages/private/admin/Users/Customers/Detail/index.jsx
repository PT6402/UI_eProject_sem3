import { useParams } from "react-router-dom";

export default function Detail_customer() {
  const { id: id } = useParams();
  return <div>customers : {id}</div>;
}
