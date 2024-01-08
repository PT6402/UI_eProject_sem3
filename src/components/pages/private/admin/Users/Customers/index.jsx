import { Card } from "@mui/material";
import { UIBox } from "../../../../../common";
import { DataTable } from "../../../../../models";
import { columns } from "./data";
import { useEffect, useState } from "react";
import { useUserStore } from "../../../../../../hooks/useUserStore";

export default function Customers() {
  const [user, setUser] = useState(null);
  const { gets, isLoading } = useUserStore();
  const handleCallApi = async () => {
    await gets().then((res) => setUser(res));
  };

  useEffect(() => {
    handleCallApi();
  }, []);
  return (
    <>
      {!isLoading && user != null && (
        <UIBox my={3} sx={() => ({ width: "100%" })}>
          <UIBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={2}>
            <UIBox display="flex">
              <UIBox ml={1}></UIBox>
            </UIBox>
          </UIBox>
          <Card>
            <DataTable
              table={{ columns, rows: user }}
              entriesPerPage={true}
              canSearch
            />
          </Card>
        </UIBox>
      )}
    </>
  );
}
