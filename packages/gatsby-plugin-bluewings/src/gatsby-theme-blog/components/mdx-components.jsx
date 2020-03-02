import React from 'react';
import { Styled, css } from 'theme-ui';
import rangeParser from 'parse-numeric-range';
import { Prism } from './prism';

const Pre = (preProps) => {
  const childProps = { ...(preProps.children && preProps.children.props) };
  if (childProps.mdxType === 'code') {
    let className = childProps.className;
    let highlightLines;
    if (typeof className === 'string') {
      const matched = className.trim().match(/^language-([^{}]+)(\{(.+)\}){0,1}$/);
      if (matched) {
        const [, language, , option] = matched;
        if (typeof option === 'string' && option.match(/^[0-9,-.]+$/)) {
          try {
            highlightLines = rangeParser.parse(option);
            className = 'language-' + language;
          } catch (err) {
            // ignore
          }
        }
      }
    }
    return <Prism {...childProps} className={className} highlightLines={highlightLines} />;
  }
  return <Styled.pre {...preProps} />;
};

const mdxComponents = {
  pre: Pre,
};

export default mdxComponents;
