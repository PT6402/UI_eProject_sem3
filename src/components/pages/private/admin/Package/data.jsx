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

import Form_Duration from "./Detail";
import Form_CallCharge from "./Detail_Charge";
import { usePackage } from "../../../../../hooks/usePackage";
import Swal from "sweetalert2";

export const handleGenTableDuration = ({ packageId, durations }) => {
  const rows = durations.filter(({ package_id }) => package_id == packageId);
  const columns = [
    {
      Header: "Time",
      accessor: "time",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Price",
      accessor: "price",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Validate",
      accessor: "validate",
      Cell: ({ value }) => <DefaultCell value={value} />,
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: ({ value }) => {
        const { handleDeleteDuration } = usePackage();
        const dispatch = useDispatch();
        const handleClickDuration = () => {
          dispatch(setStatus(true));
          dispatch(setType(Form_Duration));
          dispatch(setValue(value));
        };
        const handleClickCallCharge = () => {
          dispatch(setStatus(true));
          dispatch(setType(Form_CallCharge));
          dispatch(setValue(value));
        };
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
              text: "You want delete duration!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete!",
            })
            .then(async (result) => {
              if (result.isConfirmed) {
                await handleDeleteDuration({ id: value });
                dispatch(setStatusModal());
                return Swal.fire("Delete!", "Your has been delete.", "success");
              }
            });
        };
        const handleSubmitDelete = async () => {
          await showAlert();
        };

        return (
          <>
            {rows.filter(
              ({ description }) =>
                description != null && description != "<p></p>"
            ).length > 0 && (
              <UIButton
                color="info"
                onClick={() => handleClickCallCharge(value)}>
                Call Charge
              </UIButton>
            )}
            <UIButton
              color="info"
              onClick={() => handleClickDuration(value)}
              sx={() => ({ margin: "0 1rem" })}>
              Edit
            </UIButton>
            <UIButton color="error" onClick={handleSubmitDelete}>
              Delete
            </UIButton>
          </>
        );
      },
    },
  ];
  return { columns, rows };
};

export const dataApi = {
  connect_type: [
    {
      id: 1,
      name: "Dial up",
      firstLetter: "D",
      deposit: 15.6,
      status: true,
      description: "<p><strong>hello 1</strong></p>",
      packages: [{ package_id: 1 }, { package_id: 2 }],
    },
    {
      id: 2,
      name: "Broadband",
      firstLetter: "B",
      deposit: 30.6,
      status: true,
      description: "<p><strong>hello 2</strong></p>",
      packages: [{ package_id: 3 }, { package_id: 4 }],
    },
    {
      id: 3,
      name: "Landline",
      firstLetter: "L",
      deposit: 50.6,
      status: false,
      description: "<p><strong>hello 3</strong></p>",
      packages: [{ package_id: 5 }, { package_id: 6 }],
    },
  ],
  package: [
    //package-connect 1
    {
      id: 1,
      name: "package 1-1",
      connect_type_id: 1,
      durations: [{ duration_id: 1 }, { duration_id: 2 }, { duration_id: 3 }],
    },
    {
      id: 2,
      name: "package 1-2",
      connect_type_id: 1,
      durations: [{ duration_id: 4 }, { duration_id: 5 }, { duration_id: 6 }],
    },

    //package-connect 2
    {
      id: 3,
      name: "package 2-3",
      connect_type_id: 2,
      durations: [{ duration_id: 7 }, { duration_id: 8 }, { duration_id: 8 }],
    },
    {
      id: 4,
      name: "package 2-4",
      connect_type_id: 2,
      durations: [
        { duration_id: 10 },
        { duration_id: 11 },
        { duration_id: 12 },
      ],
    },

    //package-connect 3
    {
      id: 5,
      name: "package 3-5",
      connect_type_id: 3,
      durations: [
        { duration_id: 13 },
        { duration_id: 14 },
        { duration_id: 15 },
      ],
    },
    {
      id: 6,
      name: "package 3-6",
      connect_type_id: 3,
      durations: [
        { duration_id: 16 },
        { duration_id: 17 },
        { duration_id: 18 },
      ],
    },
    {
      id: 7,
      name: "package 3-6",
      connect_type_id: 3,
      durations: [],
    },
  ],
  duration: [
    //duration-package 1
    {
      id: 1,
      package_id: 1,
      time: "time 1-1",
      price: "123",
      validate: "validate",
      description: null,
    },
    {
      id: 2,
      package_id: 1,
      time: "time 1-2",
      price: "456",
      validate: "validate",
      description: null,
    },
    {
      id: 3,
      package_id: 1,
      time: "time 1-3",
      price: "123",
      validate: "validate",
      description: null,
    },

    //duration-package 2
    {
      id: 4,
      package_id: 2,
      time: "time 4-2",
      price: "123",
      validate: "validate",
      description: null,
    },
    {
      id: 5,
      package_id: 2,
      time: "time 5-2",
      price: "123",
      validate: "validate",
      description: null,
    },
    {
      id: 6,
      package_id: 2,
      time: "time 6-2",
      price: "123",
      validate: "validate",
      description: null,
    },

    //duration-package 3
    {
      id: 7,
      package_id: 3,
      time: "time 7-3",
      price: "123",
      validate: "validate",
      description: null,
    },
    {
      id: 8,
      package_id: 3,
      time: "time 8-3",
      price: "123",
      validate: "validate",
      description: null,
    },
    {
      id: 9,
      package_id: 3,
      time: "time 9-3",
      price: "123",
      validate: "validate",
      description: null,
    },

    //duration-package 4
    {
      id: 10,
      package_id: 4,
      time: "time 10-4",
      price: "123",
      validate: "validate",
      description: null,
    },
    {
      id: 11,
      package_id: 4,
      time: "time 11-4",
      price: "123",
      validate: "validate",
      description: null,
    },
    {
      id: 12,
      package_id: 4,
      time: "time 12-4",
      price: "123",
      validate: "validate",
      description: null,
    },

    //duration-package 5
    {
      id: 13,
      package_id: 5,
      time: "time 13-5",
      price: "123",
      validate: "validate",
      description: "123",
    },
    {
      id: 14,
      package_id: 5,
      time: "time 14-5",
      price: "123",
      validate: "validate",
      description: "123",
    },
    {
      id: 15,
      package_id: 5,
      time: "time 15-5",
      price: "123",
      validate: "validate",
      description: "123",
    },

    //duration-package 6
    {
      id: 16,
      package_id: 6,
      time: "time 16-6",
      price: "123",
      validate: "validate",
      description: "123",
    },
    {
      id: 17,
      package_id: 6,
      time: "time 17-6",
      price: "123",
      validate: "validate",
      description: "123",
    },
    {
      id: 18,
      package_id: 6,
      time: "time 18-6",
      price: "123",
      validate: "validate",
      description: "123",
    },
  ],
};
