import * as React from 'react';
import styles from '../Grid.module.scss';

function Row(props: any) {
  return (
    <div
      className={styles.row}
      // style={{ border: '5px dashed red', padding: 10, margin: 10 }}
    >
      {props.children}
    </div>
  );
}

export default Row;
