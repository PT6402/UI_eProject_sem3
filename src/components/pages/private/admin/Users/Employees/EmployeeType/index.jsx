import { Card } from "@mui/material";
import { UIBox } from "../../../../../../common";
import { DataTable } from "../../../../../../models";
import data from "./data";

export default function EmployeeType() {
  return (
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
          table={data}
          entriesPerPage={false}
          showTotalEntries={false}
          isSorted={false}
        />
      </Card>
    </UIBox>
  );
}
