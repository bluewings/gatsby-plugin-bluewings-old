// https://github.com/system-ui/theme-ui/blob/master/packages/prism/src/index.js
/** @jsx jsx */
/* eslint react/jsx-key: 0 */
import Highlight, { defaultProps } from 'prism-react-renderer';
import { jsx, Styled, useColorMode } from 'theme-ui';
// import { useColorMode } from 'theme-ui'

const aliases = {
  js: 'javascript',
  sh: 'bash',
};

const identity = (e) => e;

export const Prism = ({ children, className: outerClassName, title, highlightLines, ...props }) => {
  const [colorMode] = useColorMode();
  const colorModeClassName = colorMode === 'dark' ? colorMode : 'light';
  const [language] = outerClassName.replace(/language-/, '').split(' ');
  const lang = aliases[language] || language;
  const overrideProps = (prev, type) => {
    const next = { ...prev };
    delete next.style;
    if (type === 'line' && highlightLines && highlightLines.indexOf(next.key) !== -1) {
      return {
        ...next,
        className: [next.className, 'token-line-highlight'].filter(identity).join(' '),
      };
    }
    return next;
  };

  return (
    <div>
      <Highlight {...defaultProps} {...props} code={children.trim()} language={lang} theme={undefined}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Styled.pre className={`${outerClassName} ${className} ${colorModeClassName} `} style={style}>
            {tokens.map((line, i) => (
              <div {...overrideProps(getLineProps({ line, key: i }), 'line')}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} sx={{ display: 'inline-block' }} />
                ))}
              </div>
            ))}
          </Styled.pre>
        )}
      </Highlight>
    </div>
  );
};
