/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";

import { motion, AnimatePresence } from "framer-motion";

import { useKeyDown } from "hooks/useKeyDown";

import { Backdrop } from "components/common";

import styles from "./index.module.scss";
import FrameUI from "../../../../helpers/FrameUI";
import { CssBaseline } from "@mui/material";

const UIModalCenter = ({
  children,
  close,
  backdropClassName,
  containerClassName,
  wrapperClassName,
  modalClassName,
}) => {
  useKeyDown(() => {
    close();
  }, ["Escape"]);

  const overlayElement = document.getElementById("overlay");

  const variants = {
    initial: { y: "50vh", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "50vh", opacity: 0 },
  };

  return (
    <FrameUI>
      <CssBaseline />
      <AnimatePresence>
        {children && (
          <>
            {createPortal(
              <>
                <Backdrop
                  backdropClassName={`${styles.backdrop} ${backdropClassName}`}
                />
                <div
                  onClick={close}
                  className={`${styles.modal_container} ${containerClassName}`}>
                  <div
                    className={`${styles.modal_wrapper} ${wrapperClassName}`}>
                    <motion.div
                      onClick={(e) => e.stopPropagation()}
                      key="center-modal"
                      variants={variants}
                      initial="initial"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className={`${styles.center_modal} ${modalClassName}`}>
                      {children}
                    </motion.div>
                  </div>
                </div>
              </>,
              overlayElement
            )}
          </>
        )}
      </AnimatePresence>
    </FrameUI>
  );
};

export default UIModalCenter;
