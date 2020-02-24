import * as React from 'react';
import styles from './GridColumn.module.scss';

function GridColumn(props: any) {
  return (
    <div
      className={styles.root}
      style={{ border: '5px dashed green', padding: 10, margin: 10 }}
    >
      {props.children}
    </div>
  );
}

export default GridColumn;
