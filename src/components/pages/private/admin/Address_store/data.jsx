/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { DefaultCell } from "../../../../models";
import { UIButton } from "../../../../common";

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
const convertStringToArray = (stringCode) => {
  let listCode = stringCode.split("-").map((item) => Number(item));
  return listCode;
};
const convertCodeToRegion = (code, listPhoneCode) => {
  let regionName = null;
  listPhoneCode.map((item) => {
    let phoneCodeArr = convertStringToArray(item.code);
    let checkCode = phoneCodeArr.find((phoneCode) => phoneCode == code);

    if (checkCode != null) {
      regionName = item.name;
    }
  });
  return regionName;
};

const data = {
  columns: [
    {
      Header: "Name",
      accessor: "name",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Address",
      accessor: "address",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Region",
      accessor: "region",
      Cell: ({ value }) => (
        <DefaultCell value={convertCodeToRegion(value, listPhoneCode)} />
      ),
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => (
        <Link to={`/admin/address-stores/${value}`}>
          <UIButton color="info" size="small">
            Edit
          </UIButton>
        </Link>
      ),
    },
  ],

  rows: [
    {
      id: 1,
      name: "Cở sở 1",
      address: "quan 1",
      region: 209,
    },
    {
      id: 2,
      name: "Cơ sở 2",
      address: "quan 12",
      region: 236,
    },
    {
      id: 3,
      name: "Cơ sở 3",
      address: "quan 9",
      region: 251,
    },
  ],
};

export default data;
export { listPhoneCode };
