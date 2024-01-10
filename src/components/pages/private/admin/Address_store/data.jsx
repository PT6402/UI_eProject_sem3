/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { DefaultCell } from "../../../../models";
import { UIButton } from "../../../../common";
import {
  GetDistrictByCode,
  GetProviceByCode,
  GetWardByCode,
} from "../../../../../helpers/GetAddressApi";
import { useAddressStore } from "../../../../../hooks/useAddressStore";
import { useDispatch } from "react-redux";
import { setStatusModal } from "../../../../../context/modalSlice";
import Swal from "sweetalert2";

const convertStringToArray = (stringCode) => {
  let listCode = stringCode.split("-").map((item) => Number(item));
  return listCode;
};

const convertCodeToRegion = (code) => {
  let region = {};
  listPhoneCode.map((item) => {
    let phoneCodeArr = convertStringToArray(item.code);
    let checkCode = phoneCodeArr.find((phoneCode) => phoneCode == code);
    if (checkCode != null) {
      region = { name: item.name, id: item.id };
    }
  });
  return region;
};

const handleGetRow = async (item) => {
  const itemNew = { ...item };
  await GetProviceByCode(item.province_code).then(
    (res) => (itemNew.province_name = res.data.name)
  );
  await GetDistrictByCode(item.district_code).then(
    (res) => (itemNew.district_name = res.data.name)
  );
  await GetWardByCode(item.ward_code).then(
    (res) => (itemNew.ward_name = res.data.name)
  );
  return itemNew;
};
const handleGetRowAddresUser = async (item) => {
  const itemNew = { ...item };
  await GetProviceByCode(item.province_code).then((res) => {
    itemNew.province_name = res.data.name;
    itemNew.phone_code = res.data.phone_code;
  });
  await GetDistrictByCode(item.district_code).then(
    (res) => (itemNew.district_name = res.data.name)
  );
  await GetWardByCode(item.ward_code).then(
    (res) => (itemNew.ward_name = res.data.name)
  );
  return itemNew;
};

const listPhoneCode = [
  {
    id: 1,
    name: "Miền bắc",
    code: "214-216-215-213-212-218-219-206-209-205-207-208-210-204-203-222-226-24-228-229-227-211-220",
  },
  {
    id: 2,
    name: "Miền trung",
    code: "237-238-239-232-233-234-236-235-255-256-257-258-259-252-260-269-262-261-263",
  },
  {
    id: 3,
    name: "Miền nam",
    code: "271-274-251-276-254-28-272-277-273-296-275-270-294-293-297-299-291-290-292",
  },
];

const columns = [
  {
    Header: "Address",
    accessor: "address_full",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Region",
    accessor: "phone_name",
    Cell: ({ value }) => <DefaultCell value={value} />,
  },
  {
    Header: "Action",
    accessor: "id",
    Cell: ({ value }) => {
      const { handleDelete } = useAddressStore();
      const showAlert = async () => {
        const newSwal = Swal.mixin({
          customClass: {
            confirmButton: "button button-success",
            cancelButton: "button button-error",
          },
          buttonsStyling: false,
        });

        return newSwal
          .fire({
            title: "Are you sure?",
            text: "You want delete address store!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete!",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await handleDelete({ id: value });
              dispatch(setStatusModal());
              return Swal.fire("Delete!", "Your has been delete.", "success");
            }
          });
      };
      const dispatch = useDispatch();
      const handleDel = async () => {
        await showAlert();
      };
      return (
        <>
          <Link to={`/admin/address-stores/${value}`}>
            <UIButton color="info" size="small">
              Edit
            </UIButton>
          </Link>
          <UIButton
            color="error"
            size="small"
            sx={{ margin: "0 1rem" }}
            onClick={() => handleDel()}>
            Delete
          </UIButton>
        </>
      );
    },
  },
];
const dataApiAddress = [];
export {
  listPhoneCode,
  columns,
  convertCodeToRegion,
  handleGetRow,
  dataApiAddress,
  handleGetRowAddresUser,
  convertStringToArray,
};
