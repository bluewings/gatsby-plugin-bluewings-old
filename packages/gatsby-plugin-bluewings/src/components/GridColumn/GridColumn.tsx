import * as React from 'react';
import styles from '../GridRow/GridRow.module.scss';

function GridColumn(props: any) {
  return (
    <div
      className={styles.grid}
      style={{ border: '5px dashed green', padding: 10, margin: 10 }}
    >
      {props.children}
    </div>
  );
}

export default GridColumn;
