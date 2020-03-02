import './typography.css';
import blogTheme from 'gatsby-theme-blog/src/gatsby-plugin-theme-ui/index';
import wavesTheme from 'gatsby-theme-waves/src/gatsby-plugin-theme-ui/index';
import presetOceanicNext from '@theme-ui/prism/presets/oceanic-next.json';
import presetPrism from '@theme-ui/prism/presets/prism.json';
import merge from 'deepmerge';
import colors from './colors';

let theme = merge(blogTheme, {
  colors,
  fonts: {
    body: `'Open Sans', 'Gothic A1', 'Apple SD Gothic NEO', helvetica, sans-serif`,
    heading: `Montserrat_ExtraBold, 'Black Han Sans', 'M PLUS Rounded 1c'`,
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    heading: 400,
  },
  styles: {
    root: {
      margin: 0,
      padding: 0,
    },
    a: {
      color: '#007acc',
      textDecoration: 'none',
    },
    blockquote: {
      marginLeft: ['-1.3125rem', '-1.75rem'],
      marginRight: [0, '1.75rem'],
      marginTop: 0,
      paddingBottom: 0,
      paddingLeft: ['0.98438rem', '1.42188rem'],
      paddingRight: 0,
      paddingTop: 0,
      marginBottom: '1.75rem',
      fontStyle: 'italic',
      borderLeft: '0.32813rem solid',
      borderColor: 'text',
      fontSize: '1.20112rem',
      lineHeight: '1.75rem',
      fontFamily: `'Merriweather','Georgia',serif`,
      fontWeight: 600,
    },
    pre: {
      mb: '1.75rem',
      ml: '-1.3125rem',
      mr: '-1.3125rem',
      p: '1.3125rem',
      borderRadius: [0, '0.3rem'],
      '&.prism-code': {
        '.token-line-highlight': {
          mr: '-1.3125rem',
          ml: '-1.3125rem',
          pr: '1rem',
          pl: '0.98437rem',
          borderLeft: '0.32813rem solid #FAC863',
        },
        '&.light': {
          ...presetOceanicNext,
          '.token-line-highlight': {
            bg: 'hsla(0,0%,100%,.125)',
          },
        },
        '&.dark': {
          ...presetPrism,
          backgroundColor: '#fdf6e3',
          '.punctuation': {
            color: '#999 !important',
          },
          '.token-line-highlight': {
            bg: 'rgba(0,0,0,.1)',
            borderLeftColor: 'rgba(0,0,0,.5)',
          },
        },
      },
    },
  },
});

theme = merge(theme, wavesTheme);

theme = {
  ...theme,
  sizes: { container: 630 },
  breakpoints: ['672px'],
  fontSizes: [12.154524686917982, 13.32085131842997, 16, 23.08319849451542, 27.725793726205854, 40, 64.2456],
  space: [0, 7, 14, 28, 56, 112, 224, 21, 42],
  prism: undefined,
};

export default theme;
