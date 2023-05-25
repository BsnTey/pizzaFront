import React from "react";
import styles from "./NotFoundBlock.module.scss";

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>Сорян</p>
    </div>
  );
};
