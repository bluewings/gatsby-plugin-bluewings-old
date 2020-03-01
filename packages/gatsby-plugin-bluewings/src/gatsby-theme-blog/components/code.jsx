import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { Styled, css } from 'theme-ui';
// import Octicon from 'react-octicon';
// import Clipboard from 'react-clipboard.js';
// import './Code.scss';
// import styles from './Code.module.scss';

const styles = {}



const identity = (e) => e;

export const Code = ({ codeString, language, highlightLines, lineWrap, clipboard, ...props }) => {
  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  }
  const overrideProps = (prev, type) => {
    const next = { ...prev };
    delete next.style;
    if (type === 'line' && highlightLines && highlightLines.indexOf(next.key) !== -1) {
      return {
        ...next,
        className: [next.className, 'gatsby-highlight-code-line'].filter(identity).join(' '),
      };
    }
    return next;
  };
  return (
    <div>
      {/* <div className={styles.root}> */}
      {/* {clipboard && (
        <div className={styles.clipboard}>
          <Clipboard data-clipboard-text={codeString}>
            <Octicon name="clippy" />
          </Clipboard>
        </div>
      )} */}
      <Highlight {...defaultProps} code={codeString} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <div className="prism-code-wrap gatsby-highlight">
            <Styled.pre className={`${className} ${lineWrap ? styles.lineWrap : ''}`}>
              {tokens.map((line, i) => (
                <div {...overrideProps(getLineProps({ line, key: i }), 'line')}>
                  {line.map((token, key, arr) => {
                    let fixed = token;
                    if (token.empty && !token.content && arr.length === 1) {
                      fixed = { ...token, content: ' ' };
                    }
                    return <span {...overrideProps(getTokenProps({ token: fixed, key }))} />;
                  })}
                </div>
              ))}
            </Styled.pre>
          </div>
        )}
      </Highlight>
    </div>
  );
};
