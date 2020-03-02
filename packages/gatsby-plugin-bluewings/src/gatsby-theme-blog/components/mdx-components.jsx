import React from 'react';
import { Styled, css } from 'theme-ui';
// import Prism from '@theme-ui/prism'
import rangeParser from 'parse-numeric-range';
import { Code } from './code';
import { Prism } from './prism';


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
    let _className = className;

    const props = {
      ...preProps.children.props,
    };

    // delete props.children;
    // delete props.className;
    
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
            _className = 'language-' + language;
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
      ...props,
      className: _className,
      codeString: codeString.trim(),
      language,
      highlightLines,
      
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
    // return <Prism {...preProps.children.props}  />;
    const props = preToCodeBlock(preProps);

    // const getLineProps = (e ) => {
    //   console.log('>>> L I N E  P R O P S');
    //   console.log(e);
    // }
    // if there's a codeString and some props, we passed the test
    if (props) {
      console.log('%c>>> preProps', 'background: red;color:#fff')
    console.log(props)
      // return <pre>
      //   {JSON.stringify(props,null, 2)}
      // </pre>
      // return <Code {...props} />;
      return <Prism {...props} {...props} 
      
      // getLineProps={getLineProps}
      />;
    }
    // it's possible to have a pre without a code in it
    return <Styled.pre {...preProps} />;
  }

  // pre: (props) => {
  //   return <h2>pre</h2>
  // },
};

export default mdxComponents;
