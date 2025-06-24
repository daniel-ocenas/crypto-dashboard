'use client';
import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
export default Loader;
