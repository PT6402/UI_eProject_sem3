import { ProductSlider } from "components/common";

import styles from "./index.module.scss";
import { Navigation } from "swiper";
import { useEffect, useState } from "react";
import { useConnect } from "../../../../../hooks/useConnect";
Navigation;
const ServiceSlider = ({ noTitle }) => {
  const [connects, setConnect] = useState(null);
  const { gets } = useConnect();
  const handleGetConnect = () => {
    gets().then((res) =>
      setConnect(
        res.map((item) => ({
          name: item.name,
          description: item.description,
          id: item.id,
        }))
      )
    );
  };
  useEffect(() => {
    handleGetConnect();
  }, []);
  return (
    <>
      {connects != null && (
        <section className={styles.section}>
          <div className={`${styles.container} main-container`}>
            {!noTitle && (
              <h1 className={styles.section_title_bottom}>services</h1>
            )}
            <div className={styles.carousel_container}>
              <ProductSlider
                slides={connects}
                slidesPerView="auto"
                spaceBetween={50}
                navigation={{
                  nextEl: ".image-swiper-button-next",
                  prevEl: ".image-swiper-button-prev",
                  disabledClass: "swiper-button-disabled",
                }}
                modules={[Navigation]}
                pagination={false}
                sliderClassName={styles.slider}
                slideClassName={styles.slide}
                fillClassName={styles.fill}
                // breakpoints={{
                //   // when window width is >= 320px
                //   320: {
                //     slidesPerView: 1,
                //     spaceBetween: 24,
                //   },
                //   // when window width is >= 480px
                //   480: {
                //     slidesPerView: 3,
                //     spaceBetween: 24,
                //   },
                //   // when window width is >= 640px
                //   640: {
                //     slidesPerView: 6,
                //     spaceBetween: 24,
                //   },
                //   1024: {
                //     slidesPerView: 6,
                //     spaceBetween: 32,
                //     slidesPerGroup: 1,
                //   },
                //   1336: {
                //     slidesPerView: 6,
                //     spaceBetween: 32,
                //   },
                // }}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ServiceSlider;
