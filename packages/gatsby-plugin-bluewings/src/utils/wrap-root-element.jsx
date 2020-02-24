/* eslint-disable */
import React from 'react';
import { MDXProvider } from '@mdx-js/tag';
// import rangeParser from 'parse-numeric-range';
// import { Code } from '../components/Code';
// import Grid from '../components/Grid';
// import { Provider as ThemeProvider } from './theme-context';
// import { Provider as DataProvider } from './context';
// import styles from './wrap.module.scss';

const styles = {};

// const getHeading = (tag: string) => {
//   let Heading: any;
//   switch (tag) {
//     case 'h1':
//       Heading = (props: any) => <h1 {...props} />;
//       break;
//     case 'h2':
//       Heading = (props: any) => <h2 {...props} />;
//       break;
//     case 'h3':
//       Heading = (props: any) => <h3 {...props} />;
//       break;
//     case 'h4':
//       Heading = (props: any) => <h4 {...props} />;
//       break;
//     case 'h5':
//       Heading = (props: any) => <h5 {...props} />;
//       break;
//     default:
//       Heading = (props: any) => <h6 {...props} />;
//       break;
//   }

//   return (headingProps: any) => {
//     const { children } = headingProps;

//     if (typeof children !== 'string') {
//       return <Heading {...headingProps} />;
//     }

//     const anchor = children
//       .toLowerCase()
//       .replace(/[^a-zA-Z가-힣0-9]/g, ' ')
//       .trim()
//       .replace(/\s+/g, '-');

//     return (
//       <div>
//         <Heading>
//           <a id={`user-content-${anchor}`} className={styles.anchor} aria-hidden="true" href={`#${anchor}`}>
//             <div id={`${anchor}`} />
//             <svg
//               className="octicon octicon-link"
//               viewBox="0 0 16 16"
//               version="1.1"
//               width="16"
//               height="16"
//               aria-hidden="true"
//             >
//               <path
//                 fill-rule="evenodd"
//                 d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
//               />
//             </svg>
//           </a>
//           {headingProps.children}
//         </Heading>
//       </div>
//     );
//   };
// };

// const preToCodeBlock = (preProps: any) => {
//   if (
//     // children is MDXTag
//     preProps.children &&
//     // MDXTag props
//     preProps.children.props &&
//     // if MDXTag is going to render a <code>
//     preProps.children.props.name === 'code'
//   ) {
//     // we have a <pre><code> situation
//     const {
//       children: codeString,
//       props: { className, ...props },
//     } = preProps.children.props;
//     let language;
//     let highlightLines;
//     if (typeof className === 'string') {
//       const matched = className.trim().match(/^language-([^{}]+)(\{(.+)\}){0,1}$/);
//       if (matched) {
//         let option;
//         [, language, , option] = matched;
//         if (typeof option === 'string' && option.match(/^[0-9,-.]+$/)) {
//           try {
//             highlightLines = rangeParser.parse(option);
//           } catch (err) {
//             // ignore
//           }
//         }
//       }
//     }
//     return {
//       codeString: codeString.trim(),
//       language,
//       highlightLines,
//       ...props,
//     };
//   }
//   return null;
// };

const GRID = 'grid';
const GRID_WRAPPER = 'row';

const parseNode = (() => {
  const pattern = /^gatsby--([^\s]+)$/;
  return (node) => {
    const { type, key, props } = node;
    if (typeof type === 'string' && type.search(pattern) === 0) {
      // @ts-ignore
      const [, tagName] = type.match(pattern);
      let tag = tagName.replace(/end$/, '');
      const open = tagName === tag;
      if (tag === GRID && open === false) {
        tag = GRID_WRAPPER;
      }
      return { tag, open, key, props };
    }
    return { tag: null, type: null, node };
  };
})();

const getParent = (stack) => stack.slice(-1)[0] || {};

const getCursor = (stack, root) => getParent(stack).cursor || root;

const getChildProps = (tag, props = {}) => {
  const { id, className, args = [], params = {} } = props;

  const styleKeys = [
    'background',
    'color',
    'overflow',
    'minHeight',
    'maxHeight',
    'height',
  ];

  const childStyle = Object.keys(params)
    .filter((e) => styleKeys.indexOf(e) !== -1)
    .reduce((accum, key) => ({ ...accum, [key]: params[key] }), {});

  const dataProps = Object.keys(params)
    .filter((e) => e.search(/^@/) !== -1)
    .reduce(
      (accum, key) => ({ ...accum, [key.replace(/^@/, 'data-')]: params[key] }),
      {},
    );

  const childProps = {
    ...dataProps,
    className: [
      `gatsby--${tag}`,
      ...[tag, ...(args || []).map((e) => `${tag}_${e}`)].map((e) => styles[e]),
      className,
    ]
      .filter((e) => e)
      .join(' '),
  };

  if (id) {
    childProps.id = id;
  }
  if (Object.keys(childStyle).length > 0) {
    childProps.style = childStyle;
  }

  return childProps;
};

const Wrapper = (props) => (
  <main style={{ padding: '20px', backgroundColor: 'tomato' }} {...props} />
);

// components is its own object outside of render so that the references to
// components are stable
const components = {
  'gatsby--grid': () => {
    return (
      <h1>
        <i>gatsby-grid</i>
      </h1>
    );
  },
  h1: (props) => {
    return (
      <div>
        <hr />
        <span>-------</span>
        <h1 {...props} />
        <hr />
      </div>
    );
  },
  h2: (props) => {
    return (
      <div>
        <hr />
        <span>-------</span>
        <h1 {...props} />
        <hr />
      </div>
    );
  },
  // h2: getHeading('h2'),
  // h3: getHeading('h3'),
  // h4: getHeading('h4'),
  // h5: getHeading('h5'),
  // h6: getHeading('h6'),
  // pre: (preProps) => {
  //   const props = preToCodeBlock(preProps);
  //   // if there's a codeString and some props, we passed the test
  //   if (props) {
  //     return <Code {...props} />;
  //   }
  //   // it's possible to have a pre without a code in it
  //   return <pre {...preProps} />;
  // },
  wrapper: Wrapper,
  // wrapper: (gridProps) => {
  //   const children = Array.isArray(gridProps.children) ? gridProps.children : [gridProps.children];

  //   console.log(children)
  //   // throw('err');

  //   // return (<h1>wrapper here!!!</h1>)

  //   return children.reduce(
  //     (accum, child) => {
  //       const { tag, key, props, open } = parseNode(child);
  //       const { stack, root } = accum;

  //       if (tag) {
  //         const parent = getParent(stack);
  //         if (open) {
  //           // same as the previous tag, create it as a sibling node.
  //           if (parent && parent.tag === tag) {
  //             stack.pop();
  //           }
  //           if (tag === GRID && getParent(stack).tag !== GRID_WRAPPER) {
  //             const columns = [];
  //             const childProps = getChildProps(GRID_WRAPPER);
  //             getCursor(stack, root).push(
  //               <div key={key} {...childProps} data-snippet-tag={GRID_WRAPPER}>
  //                 {columns}
  //               </div>,
  //             );
  //             stack.push({ tag: GRID_WRAPPER, cursor: columns });
  //           }
  //           const childNodes = [];
  //           const childProps = getChildProps(tag, props);
  //           let next = (
  //             <div key={key} {...childProps} data-snippet-tag={tag}>
  //               <h2>wow-child props</h2>
  //               {childNodes}
  //             </div>
  //           );
  //           if (tag === 'context') {
  //             // next = <DataProvider>{next}</DataProvider>;

  //             next = <div className="WOW-CONTEXT">{next}</div>;
  //           } else if (tag === GRID) {
  //             next = (
  //               <div key={key} {...childProps} data-snippet-tag={tag}>
  //                 {/* <Grid {...props.params}>{childNodes}</Grid> */}
  //                 <h2>wow-grid</h2>
  //                 <div className="WOW-GRID" {...props.params}>{childNodes}</div>
  //               </div>
  //             );
  //           }
  //           getCursor(stack, root).push(next);
  //           stack.push({ tag, cursor: childNodes });
  //         } else {
  //           let curr;
  //           do {
  //             curr = stack.pop();
  //           } while (curr && curr.tag !== tag);
  //         }
  //       } else {
  //         getCursor(stack, root).push(child);
  //       }
  //       return accum;
  //     },
  //     { root: [], stack: [] },
  //   ).root;
  // },
};

export const wrapRootElement = ({ element }) => (
  <div>
    <h1>MDX Start</h1>
    {element}

    <h1>MDX End</h1>
  </div>
);

// -export const wrapRootComponent = ({ Root }) => {
//   +export const wrapRootElement = ({ element }) => {
//   -  const ConnectedRootComponent = () => (
//   +  const ConnectedRootElement = (
//       <Provider store={store}>
//   -      <Root />
//   +      {element}
//       </Provider>
//     )
//   -  return ConnectedRootComponent
//   +  return ConnectedRootElement
//   }

// <ThemeProvider>
//     <MDXProvider components={components}>{element}</MDXProvider>
//   </ThemeProvider>
