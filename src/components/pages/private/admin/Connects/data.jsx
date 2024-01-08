/* eslint-disable react/prop-types */
import { DefaultCell } from "../../../../models";
import { UIButton } from "../../../../common";
import { dataApi } from "../Package/data";
import { useDispatch } from "react-redux";
import {
  setStatus,
  setStatusModal,
  setType,
  setValue,
} from "../../../../../context/modalSlice";
import Detail_Connect from "./Detail";
import { axiosAuthentication } from "../../../../../../http";
import { useConnect } from "../../../../../hooks/useConnect";
const data = {
  columns: [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "deposit",
      accessor: "deposit",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => {
        const dispatch = useDispatch();
        const handleChangeModal = () => {
          dispatch(setStatus(true));
          dispatch(setType(Detail_Connect));
          dispatch(setValue(value));
        };
        const handleDelete = () => {
          const data = { connect_type_id: value };
          console.log(data);
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
            <UIButton color="error" onClick={handleDelete}>
              Delete
            </UIButton>
          </>
        );
      },
    },
  ],

  rows: dataApi.connect_type,
};
const columns = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "deposit",
    accessor: "deposit",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }) => {
      const { handleDelete } = useConnect();
      const dispatch = useDispatch();
      const handleChangeModal = () => {
        dispatch(setStatus(true));
        dispatch(setType(Detail_Connect));
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
export default data;
export { columns };
