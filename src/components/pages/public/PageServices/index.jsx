import FrameUI from "../../../../helpers/FrameUI";
import { Grid } from "@mui/material";
import { Loader, UIBox, UITypography } from "../../../common";
import waves from "assets/images/private/shapes/waves-white.svg";
import ServiceSlider from "../Home/ServiceSlider";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useConnect } from "../../../../hooks/useConnect";
import styles from "./index.module.scss";
import Item from "./Item";
import Header from "./Header";
import { usePackage } from "../../../../hooks/usePackage";
export default function PageService() {
  const { pathname } = useLocation();
  const { id: Id } = useParams();
  const { gets, isLoading } = useConnect();
  const { gets: getPackage } = usePackage();
  const [connects, setConnects] = useState(null);
  const [packages, setPackages] = useState(null);
  const [durations, setDurations] = useState(null);
  const [dataDura, setDataDura] = useState(null);
  const handleGetConnects = async () => {
    await gets().then((res) => setConnects(res.find(({ id }) => id == Id)));
    await getPackage().then(({ durations, packages }) => {
      setPackages(
        packages.filter(({ connect_type_id }) => connect_type_id == Id)
      );
      const pak = packages
        .filter(({ connect_type_id }) => connect_type_id == Id)
        .map((item) => {
          return item.package_id;
        });
      setDurations(
        durations.filter(({ package_id }) => pak.includes(package_id))
      );
    });
  };
  useEffect(() => {
    handleGetConnects();
  }, [pathname]);
  useEffect(() => {
    handleSort();
  }, [durations, pathname]);
  const [htmlparse, setHtmlParse] = useState();
  const handelConvertStringToHtml = () => {
    const parser = new DOMParser();
    const html = parser.parseFromString(connects.description, "text/html");
    setHtmlParse(html.body.firstChild.textContent);
  };
  useEffect(() => {
    if (connects != null) {
      handelConvertStringToHtml();
    }
  }, [connects]);
  const handleSort = (packageid) => {
    if (durations != null) {
      if (packages != null) {
        if (packageid == null) {
          const pack = packages.map((item) => {
            return item.package_id;
          });
          setDataDura(
            durations.filter(({ package_id }) => package_id == pack[0])
          );
        } else {
          const pack = packages.map((item) => {
            return item.package_id;
          });
          if (packageid == pack.length) {
            setDataDura(
              durations.filter(({ package_id }) => pack.includes(package_id))
            );
          } else {
            setDataDura(
              durations.filter(
                ({ package_id }) => package_id == pack[packageid]
              )
            );
          }
        }
      }
    }
  };
  const handleGetNamePackage = (item) => {
    if (packages != null) {
      return packages
        .map((item) => {
          return {
            name: item.namePackage,
            dura: item.durations.map((item) => item.duration_id),
          };
        })
        .find(({ dura }) => dura.includes(item.id));
    }
    // .find((dura) => dura.includes(item.id)).namePackage;
  };
  if (!isLoading && connects != null && packages != null && dataDura != null) {
    return (
      <>
        {isLoading && <Loader />}
        {!isLoading &&
          connects != null &&
          packages != null &&
          dataDura != null && (
            <>
              <section className={styles.section}>
                <div className={`${styles.container} main-container`}>
                  <FrameUI>
                    <Header
                      name={connects.name}
                      packages={packages}
                      handleSort={handleSort}
                    />
                    <UIBox pt={5} pb={2}>
                      <Grid container>
                        <Grid item xs={12} md={8} ml={2}>
                          <UIBox mb={1}>
                            <UITypography variant="h3">
                              Description:
                            </UITypography>
                          </UIBox>
                          <UIBox mb={2}>
                            <UITypography color="text" variant="h5">
                              {htmlparse}
                            </UITypography>
                          </UIBox>
                        </Grid>
                      </Grid>
                      <UIBox mt={{ xs: 1, lg: 3 }} mb={1}>
                        <Grid container spacing={5}>
                          {dataDura != null &&
                            dataDura.map((item) => {
                              return (
                                <Grid key={item.id} item xs={12} md={6} lg={3}>
                                  <Item
                                    id={item.id}
                                    price={item.price}
                                    time={item.time}
                                    name={handleGetNamePackage(item)?.name}
                                    title={`${item.time}_${
                                      handleGetNamePackage(item)?.name
                                    }`}
                                    description={item.description}
                                  />
                                </Grid>
                              );
                            })}
                        </Grid>
                      </UIBox>
                    </UIBox>
                  </FrameUI>
                </div>
              </section>
            </>
          )}
      </>
    );
  }
}
