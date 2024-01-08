import { Card, Typography } from "@mui/material";
import FrameUI from "../../../../helpers/FrameUI";
import { UIBox, UIButton, UITypography } from "../../../common";
import styles from "./";
import Header from "./Header";
export default function AbountUs() {
  const sofa =
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <FrameUI>
          <Header />
          <Card
            sx={{
              height: "100%",
              marginTop: "5rem",
              padding: "5rem 0 ",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
            }}>
            <UIBox p={3} sx={{ display: "flex" }}>
              <UIBox
                component="img"
                src={sofa}
                alt="Product Image"
                borderRadius="lg"
                shadow="lg"
                width="40%"
                my={3}
              />
              <UIBox p={3}>
                <UITypography>
                  We believe that every project existing in digital world is a
                  result of an idea and every idea has a cause. For this reason,
                  our each design serves an idea. Our strength in design is
                  reflected by our name, our care for details. Our specialist
                  won't be afraid to go extra miles just to approach near
                  perfection. We don't require everything to be perfect, but we
                  need them to be perfectly cared for. That's a reason why we
                  are willing to give contributions at best. Not a single detail
                  is missed out under Billey's professional eyes.The amount of
                  dedication and effort equals to the level of passion and
                  determination. Get better, together as one.
                </UITypography>
              </UIBox>
            </UIBox>
          </Card>
        </FrameUI>
      </div>
    </section>
  );
}
