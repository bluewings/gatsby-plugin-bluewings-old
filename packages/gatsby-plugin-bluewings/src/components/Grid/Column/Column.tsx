import React, { useMemo } from 'react';
import { useMeasure } from 'react-use';
import styles from '../Grid.module.scss';

const identity = (e: any) => e;

function Column(props: any) {
  const { args, layoutFixed } = props;

  const className = useMemo(
    () => [styles.grid, ...args.map((e: string) => styles[`grid_${e}`])].filter(identity).join(' '),
    [args],
  );

  if (layoutFixed) {
    return (
      <div
        className={className}
        // style={{ border: '5px dashed green', padding: 10, margin: 10 }}
      >
        <LayoutFixed>{props.children}</LayoutFixed>
      </div>
    );
  }

  return <div className={className}>{props.children}</div>;
}

function LayoutFixed(props: any) {
  const [ref, { height }] = useMeasure();

  return (
    <div className={styles.layout_fixed_outer} style={{ height }}>
      <div className={styles.layout_fixed_inner} ref={ref}>
        {props.children}
      </div>
    </div>
  );
}

export default Column;
