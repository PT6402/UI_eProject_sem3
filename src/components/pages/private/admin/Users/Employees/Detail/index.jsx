import { useParams } from "react-router-dom";

export default function Detail_employee() {
  const { id: id } = useParams();
  return <div>employee :{id}</div>;
}
