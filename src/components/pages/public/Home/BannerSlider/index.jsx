import { useMediaQuery } from "react-responsive";

import { Autoplay, Pagination, A11y } from "swiper";

import { Slider } from "components/common";

import {
  BIG_SCREEN_SLIDES as bigScreenSlides,
  SMALL_SCREEN_SLIDES as smallScreenSlides,
} from "./data";

import styles from "./index.module.scss";

const SlideshowSection = () => {
  const isBigScreen = useMediaQuery({
    query: "(min-width: 900px)",
  });

  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className={styles.content_container}>
          {isBigScreen && (
            <Slider
              slides={bigScreenSlides}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              centeredSlides={true}
              grabCursor={true}
              autoplay={{
                delay: 5500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              sliderClassName={styles.slider}
              imageFillClassName={styles.big_image_fill}
              imageClassName={styles.big_image}
            />
          )}
          {!isBigScreen && (
            <Slider
              slides={smallScreenSlides}
              slidesPerView={1}
              spaceBetween={0}
              loop={true}
              centeredSlides={true}
              grabCursor={true}
              autoplay={{
                delay: 5500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, A11y]}
              sliderClassName={styles.slider}
              imageFillClassName={styles.small_image_fill}
              imageClassName={styles.small_image}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default SlideshowSection;
