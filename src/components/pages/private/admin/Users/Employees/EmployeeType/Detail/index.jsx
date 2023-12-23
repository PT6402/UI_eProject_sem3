import { useParams } from "react-router-dom";

export default function DetailEmployeeType() {
  const { id: id } = useParams();
  return <div>employee type :{id}</div>;
}
