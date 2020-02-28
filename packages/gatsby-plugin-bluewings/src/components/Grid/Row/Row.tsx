import * as React from 'react';
import styles from '../Grid.module.scss';

function Row(props: any) {
  return <div className={styles.row}>{props.children}</div>;
}

export default Row;
