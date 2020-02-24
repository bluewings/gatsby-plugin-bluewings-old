import * as React from 'react';
import styles from './GridRow.module.scss';

function GridRow(props: any) {
  return (
    <div
      className={styles.row}
      // style={{ border: '5px dashed red', padding: 10, margin: 10 }}
    >
      {props.children}
    </div>
  );
}

export default GridRow;
