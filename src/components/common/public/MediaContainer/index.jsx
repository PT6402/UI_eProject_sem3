/* eslint-disable react/prop-types */
import { useState, useRef } from "react";

import styles from "./index.module.scss";

const MediaContainer = ({
  image,
  alt,
  onClick,
  clearPlaceholders,
  containerClassName,
  fillClassName,
  placeholderClassName,
  mediaClassName,
}) => {
  const placeholdersCleared = useRef(false);

  const [mediaIsLoading, setMediaIsLoading] = useState(true);
  const [showMediaPlaceHolder, setShowMediaPlaceholder] = useState(true);

  const clearMediaPlaceholder = () => {
    if (clearPlaceholders && !placeholdersCleared.current) {
      placeholdersCleared.current = true;
      clearPlaceholders();
    }
    setShowMediaPlaceholder(false);
    setTimeout(() => {
      return setMediaIsLoading(false);
    }, 100);
  };

  return (
    <div
      onClick={onClick}
      className={`${styles.media_container} ${containerClassName}`}>
      <div className={`${styles.media_fill} ${fillClassName}`}>
        {mediaIsLoading && (
          <div
            className={`${styles.media_placeholder} ${placeholderClassName} ${
              showMediaPlaceHolder ? undefined : styles.hide
            }`}
          />
        )}
        {image && (
          <img
            src={image}
            onLoad={clearMediaPlaceholder}
            alt={alt}
            className={`${styles.image} ${mediaClassName} ${
              !mediaIsLoading ? styles.show : undefined
            }`}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
};

export default MediaContainer;
