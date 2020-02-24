import React, { useMemo } from 'react';
import styles from '../Grid.module.scss';


const identity = (e: any) => e;
function Column(props: any) {
  const { args, layoutFixed } = props;
  console.log({ args, layoutFixed });

  const className = useMemo(() => {


    return [
      styles.grid,
      ...args.map((e: string) => {
        return styles[`grid_${e}`]
      })
    ].filter(identity).join(' ')

  }, [args]);

  
  return (
    <div
      className={className}
      style={{ border: '5px dashed green', padding: 10, margin: 10 }}
    >
      {/* <pre>{JSON.stringify(props)}</pre> */}
      {props.children}
    </div>
  );
}

export default Column;
