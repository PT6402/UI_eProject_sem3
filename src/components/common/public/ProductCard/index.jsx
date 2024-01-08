/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import styles from "./index.module.scss";
import Item from "./Item";

const ProductCard = ({ name, description, id }) => {
  const [isSmallContainer, setIsSmallContainer] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    const containerElement = containerRef.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setIsSmallContainer(width < 220);
      }
    });

    resizeObserver.observe(containerElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className={`${styles.container} ${
          isSmallContainer ? styles.is_small_container : undefined
        }`}>
        <div className={styles.slider_container}>
          <>
            <div
              className={`${styles.media_container} ${styles.image_container}`}>
              <div className={`${styles.media_fill} ${styles.image_fill}`}>
                <div>
                  <Item name={name} description={description} id={id} />
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
