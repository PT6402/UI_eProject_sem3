import { Link, useParams } from "react-router-dom";
import { UIBox, UIButton } from "../../../../../common";
import { Card, Grid } from "@mui/material";
import FormConnect from "./FormConnect";
import data from "../data";

export default function Detail_Connect() {
  const { id: id } = useParams();
  const handleGetById = (Id) => {
    return data.rows.find(({ id }) => id == Id);
  };
  return (
    <UIBox mt={1} mb={20}>
      <Grid container>
        <Grid item xs={12} lg={12}>
          <Card sx={{ overflow: "visible" }}>
            <UIBox p={2}>
              <UIBox>
                <FormConnect data={handleGetById(id)} />
                <UIBox
                  mt={3}
                  width="100%"
                  display="flex"
                  justifyContent="space-between">
                  <Link to={"/admin/connects"}>
                    <UIButton variant="gradient" color="secondary">
                      back
                    </UIButton>
                  </Link>
                  <UIButton variant="gradient" color="dark">
                    Submit
                  </UIButton>
                </UIBox>
              </UIBox>
            </UIBox>
          </Card>
        </Grid>
      </Grid>
    </UIBox>
  );
}
