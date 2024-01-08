import { UIBox } from "../../../common";
import { Grid } from "@mui/material";
import FrameUI from "../../../../helpers/FrameUI";
import styles from "./index.module.scss";
import Sidenav from "./Sidenav";
import HeaderAccount from "./HeaderAccount";
import { useState } from "react";
import Profile from "./Profile";
export default function Account() {
  const [isShowComponent, setIsShowComponent] = useState(Profile);
  const handleGetComponent = (component) => {
    setIsShowComponent(component);
  };
  return (
    <>
      <FrameUI>
        <section>
          <div className={`${styles.container} main-container`}>
            <div className={styles.welcome_wrapper}>
              <HeaderAccount />
            </div>
            <div className={styles.content_container}>
              <UIBox>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={3}>
                    <Sidenav handleGetComponent={handleGetComponent} />
                  </Grid>
                  <Grid item xs={12} lg={9}>
                    {isShowComponent}
                  </Grid>
                </Grid>
              </UIBox>
            </div>
          </div>
        </section>
      </FrameUI>
    </>
  );
}
