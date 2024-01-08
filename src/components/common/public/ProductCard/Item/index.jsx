/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Button from "../../Button";
import styles from "./index.module.scss";
import { Link } from "react-router-dom";
export default function Item({ name, description, id }) {
  const [htmlparse, setHtmlParse] = useState();
  const handelConvertStringToHtml = () => {
    const parser = new DOMParser();
    const html = parser.parseFromString(description, "text/html");
    setHtmlParse(html.body.firstChild.textContent);
  };
  useEffect(() => {
    handelConvertStringToHtml();
  }, []);
  return (
    <div className={styles.slide_container}>
      <div className={styles.slide_content}>
        <div className={styles.card_wrapper}>
          <div className={styles.card}>
            <div className={styles.image_content}>
              <span
                className={styles.overlay}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: "1.4rem",
                }}>
                {name}
              </span>
              <div
                className={styles.card_image}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  position: "relative",
                  top: "7rem",
                }}>
                <h2
                  className={styles.name}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    paddingTop: "1rem",
                  }}>
                  {htmlparse}
                </h2>
              </div>
            </div>
            <div className={styles.card_content}>
              {/* <div className={styles.button_wrapper}>
                <Button form="form" className={styles.button} type="submit">
                  Add
                </Button>
              </div> */}
              <Link to={`/page-services/${id}`}>
                <Button form="form" className={styles.button} type="submit">
                  More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
