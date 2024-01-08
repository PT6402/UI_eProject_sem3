/* eslint-disable react/prop-types */
import { DefaultCell } from "../../../../models";
import { UIButton } from "../../../../common";
import { useDispatch } from "react-redux";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../context/modalSlice";
import Detail_Coupon from "./Detail";
import { useCoupon } from "../../../../../hooks/useCoupon";
const dataApiCoupon = [
  {
    id: 1,
    name: "code coupon",
    to: 10,
    from: 15,
    percent_discount: 10,
  },
  {
    id: 2,
    name: "code coupon 1",
    to: 20,
    from: 30,
    percent_discount: 30,
  },
  {
    id: 3,
    name: "code coupon 3",
    to: 40,
    from: 80,
    percent_discount: 100,
  },
];
const columns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "to - from",
    accessor: "range_coupon",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "percent discount",
    accessor: "percentDiscount",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }) => {
      const { handleDelete } = useCoupon();
      const dispatch = useDispatch();
      const handleChangeModal = () => {
        dispatch(setStatus(true));
        dispatch(setType(Detail_Coupon));
        dispatch(setValue(value));
      };
      const handleDel = async () => {
        await handleDelete({ id: value });
        dispatch(setStatusModal());
      };
      return (
        <>
          <UIButton
            variant={"outlined"}
            color="info"
            onClick={handleChangeModal}
            sx={() => ({ margin: "0 1rem" })}>
            Edit
          </UIButton>
          <UIButton color="error" onClick={handleDel}>
            Delete
          </UIButton>
        </>
      );
    },
  },
];
const handleRow = ({ data }) => {
  const rows = [];
  data.map((item) => {
    const newItem = { ...item };
    newItem.range_coupon = `[${item.to} - ${item.from}]`;
    newItem.percentDiscount = `${item.percent_discount}%`;
    return rows.push(newItem);
  });
  return rows;
};
export { dataApiCoupon, columns, handleRow };
