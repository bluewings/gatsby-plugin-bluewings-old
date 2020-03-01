import React from 'react';
import { Styled, css } from 'theme-ui';
import rangeParser from 'parse-numeric-range';
import { Code } from './code';


const preToCodeBlock = (preProps) => {
  if (
    // children is MDXTag
    preProps.children &&
    // MDXTag props
    preProps.children.props &&
    // if MDXTag is going to render a <code>
    // preProps.children.props.name === 'code'
    preProps.children.props.mdxType === 'code'
  ) {
    console.log(preProps.children.props);
    // we have a <pre><code> situation
    
    const {
      children: codeString,
      className,
      // ...props,
      // props: { className, ...props },
    } = preProps.children.props;

    const props = {
      ...preProps.children.props,
    };

    delete props.children;
    delete props.className;
    
    let language;
    let highlightLines;
    if (typeof className === 'string') {
      const matched = className.trim().match(/^language-([^{}]+)(\{(.+)\}){0,1}$/);
      if (matched) {
        let option;
        [, language, , option] = matched;
        if (typeof option === 'string' && option.match(/^[0-9,-.]+$/)) {
          try {
            highlightLines = rangeParser.parse(option);
          } catch (err) {
            // ignore
          }
        }
      }
    }
    console.log({codeString, className, 
    
      language,
      highlightLines,
    
    })
    console.log('%c-=-=-=-=-=-=-=-', 'background:orange')
    return {
      codeString: codeString.trim(),
      language,
      highlightLines,
      ...props,
    };
  }
  return null;
};


const mdxComponents = {
  p: (props, a,b) => {
    console.log('>>>>')
    console.log(props)
    console.log(a)
    console.log('<<<<')
    console.log();
    return <Styled.p {...props} style={{ border: '1px solid blue' }} />;
  },
  pre: (preProps) => {
    const props = preToCodeBlock(preProps);

    console.log('%c>>> preProps', 'background: yellow')
    console.log(preProps)
    // if there's a codeString and some props, we passed the test
    if (props) {
      // return <pre>
      //   {JSON.stringify(props,null, 2)}
      // </pre>
      return <Code {...props} />;
    }
    // it's possible to have a pre without a code in it
    return <Styled.pre {...preProps} />;
  }

  // pre: (props) => {
  //   return <h2>pre</h2>
  // },
};

export default mdxComponents;
