import { Card } from "@mui/material";
import { UIBox } from "../../../../common";

import { handleGenTableDuration } from "./data";

import { useEffect, useState } from "react";
import HeaderPackage from "./HeaderPackage";
import ItemPackage from "./ItemPackage";
import ItemDuration from "./ItemDuration";
import { usePackage } from "../../../../../hooks/usePackage";
import { useDispatch, useSelector } from "react-redux";
import { useConnect } from "../../../../../hooks/useConnect";
import { setStatusModal } from "../../../../../context/modalSlice";
import { setCurrentConnect } from "../../../../../context/packageSlice";
import Swal from "sweetalert2";
export default function Packages() {
  const dispatch = useDispatch();
  const currentConnectType = useSelector(
    (state) => state.packageSlice.currentConnectType
  );
  const statusModal = useSelector((state) => state.modalType.statusModal);
  const [isOpen, setIsOpen] = useState({ status: false, value: null });
  const [packageByConnect, setPackageByConnect] = useState();
  const [packages, setPackage] = useState(null);
  const [duration, setDuration] = useState(null);
  const [connectType, setConnectType] = useState();
  const { gets: connect_types } = useConnect();
  const { gets, isLoading, update, handleDeletePackage } = usePackage();
  const handleCallApi = async () => {
    await gets().then((res) => {
      setDuration(res.durations);
      setPackage(res.packages);
    });
    await connect_types().then((res) => setConnectType(res));
  };
  useEffect(() => {
    handleCallApi();
  }, [statusModal]);

  const handleOpen = (value) => {
    if (isOpen.value == value) {
      return setIsOpen({ status: false, value: null });
    } else {
      return setIsOpen({ status: true, value });
    }
  };
  useEffect(() => {
    if (packages != null && currentConnectType != null) {
      setPackageByConnect(
        packages.filter(
          ({ connect_type_id }) => connect_type_id == currentConnectType
        )
      );
    } else if (packages != null && currentConnectType == null) {
      setPackageByConnect(
        packages.filter(({ connect_type_id }) => connect_type_id == 1)
      );
    }
  }, [packages]);
  // const handleGetValueConnect = (connect_id) => {
  //   setIsOpen({ status: false, value: null });
  //   setPackageByConnect(
  //     packages.filter(({ connect_type_id }) => connect_type_id == connect_id)
  //   );
  // };
  const showEditPackage = async () =>
    Swal.fire("Success!", "You edit package!", "success");
  const showDeletePackage = async ({ id }) => {
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
        text: "You want delete employee!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await handleDeletePackage({ id });
          dispatch(setStatusModal());
          return Swal.fire("Delete!", "Your has been delete.", "success");
        }
      });
  };
  useEffect(() => {
    if (packages != null) {
      setIsOpen({ status: false, value: null });
      setPackageByConnect(
        packages.filter(
          ({ connect_type_id }) => connect_type_id == currentConnectType + 1
        )
      );
    }
  }, [currentConnectType, packages]);
  return (
    <>
      {!isLoading && packages != null && packageByConnect != null && (
        <UIBox my={3} sx={() => ({ width: "100%" })}>
          <HeaderPackage
            // handleGetValueConnect={handleGetValueConnect}
            connectType={connectType}
          />
          <UIBox>
            {packageByConnect.map((item) => {
              let checkIdReload = false;
              const handleEdit = async ({ data }) => {
                await update({ data });
                checkIdReload = item.package_id == data.package_id;
                showEditPackage();
              };
              const handleDelete = async ({ id }) => {
                await showDeletePackage({ id });
                checkIdReload = item.package_id == id;
              };
              return (
                <Card
                  sx={() => ({
                    padding: ".5rem",
                    marginBottom: "1rem",
                  })}
                  key={item.package_id}>
                  <UIBox>
                    <ItemPackage
                      handleOpen={handleOpen}
                      isOpen={isOpen}
                      nameValue={item.namePackage}
                      idValue={item.package_id}
                      packages={packages}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                      checkIdReload={checkIdReload}
                    />
                    {isOpen.status && isOpen.value == item.package_id && (
                      <ItemDuration
                        dataDuration={handleGenTableDuration({
                          packageId: item.package_id,
                          durations: duration,
                        })}
                        package_id={item.id}
                      />
                    )}
                  </UIBox>
                </Card>
              );
            })}
          </UIBox>
        </UIBox>
      )}
    </>
  );
}
