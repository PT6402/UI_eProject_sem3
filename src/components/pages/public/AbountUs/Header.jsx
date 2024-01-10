import { UIBox, UITypography } from "../../../common";
import { Card, Grid } from "@mui/material";
export default function Header() {
  const curved0 =
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <UIBox position="relative">
      <UIBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="50rem"
        borderRadius="xxl"
        sx={{
          backgroundImage: `url(${curved0})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          backdropFilter: `saturate(200%) blur(60px)`,
          backgroundColor: ({ functions: { rgba }, palette: { white } }) =>
            rgba(white.main, 0.8),
          boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
          position: "relative",
          mt: -7,
          mx: 3,
          py: 3,
          px: 2,
        }}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent={"center"}>
          <Grid item>
            <UIBox height="100%" mt={0.5} lineHeight={1}>
              <UITypography variant="h2" fontWeight="bold">
                About Us
              </UITypography>
            </UIBox>
          </Grid>
        </Grid>
      </Card>
    </UIBox>
  );
}
