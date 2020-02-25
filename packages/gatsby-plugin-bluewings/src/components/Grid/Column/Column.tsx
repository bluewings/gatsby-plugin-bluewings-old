import * as React from 'react';
import { PureComponent, useMemo } from 'react';
import { useMeasure } from "react-use";
import styles from '../Grid.module.scss';

const identity = (e: any) => e;

function Column(props: any) {
  const { args, layoutFixed } = props;
  console.log({ args, layoutFixed });

  const test = useMemo(() => '1', []);

  const className = [
    styles.grid,
    ...args.map((e: string) => styles[`grid_${e}`]),
  ]
    .filter(identity)
    .join(' ');

  if (layoutFixed) {
    return (
      <div
      className={className}
      // style={{ border: '5px dashed green', padding: 10, margin: 10 }}
    >
      <LayoutFixed>
      {props.children}
      </LayoutFixed>
      
    </div>
    )
  }

  return (
    <div className={className}>
      {props.children}
    </div>
  );
}


class LayoutFixed extends PureComponent {
  divRef: any

  state = {
    height: 0,
  }

  constructor(props: any) {
    super(props);
    this.divRef = React.createRef();
  }
  componentDidMount() {
    console.log(this.divRef);
    if (this.divRef && this.divRef.current) {
      const { height } = this.divRef.current.getBoundingClientRect();

      this.setState((prevState: any) => {

        return {
          ...prevState,
          height,
        }

      })
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.divRef && this.divRef.current) {
      const { height } = this.divRef.current.getBoundingClientRect();

      // console.log(this.divRef.current.getBoundingClientRect())
      if (prevState.height !== height) {
        this.setState((prevState: any) => {

          return {
            ...prevState,
            height,
          }

        })
      }

      
    }
  }

  render() {
    return (
      <div className={styles.layout_fixed_outer}
      // style={{ height }}
      >
        <div className={styles.layout_fixed_inner} 
        ref={this.divRef}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
} 
// function LayoutFixed(props: any) {

//   const [ref, { height }] = useMeasure();

//   return (
//     <div className={styles.layout_fixed_outer} style={{ height }}>
//       <div className={styles.layout_fixed_inner} ref={ref}>
//         {props.children}
//       </div>
//     </div>
//   )
// }

export default Column;
