import './typography.css';
import blogTheme from 'gatsby-theme-blog/src/gatsby-plugin-theme-ui/index';
import merge from 'deepmerge';

export default merge(blogTheme, {
  fonts: {
    body: `'Open Sans', 'Gothic A1', 'Apple SD Gothic NEO', helvetica, sans-serif`,
    heading: `Montserrat_Black, Black Han Sans`,
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    // "body": 400,
    // "bold": 700,
    heading: 400,
  },
});
