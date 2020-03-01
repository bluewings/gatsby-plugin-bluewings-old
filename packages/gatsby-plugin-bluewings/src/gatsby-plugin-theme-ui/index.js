import './typography.css';
import blogTheme from 'gatsby-theme-blog/src/gatsby-plugin-theme-ui/index';
import wavesTheme from "gatsby-theme-waves/src/gatsby-plugin-theme-ui/index"
import merge from 'deepmerge';
import colors from './colors';

// import wavesTheme from "gatsby-theme-waves/src/gatsby-plugin-theme-ui/index"
// import blogTheme from "gatsby-plugin-bluewings/src/gatsby-plugin-theme-ui/index"
// import merge from "deepmerge"



console.log('>>> colors', colors)

let merged = merge(blogTheme, {
  colors,
  fonts: {
    body: `'Open Sans', 'Gothic A1', 'Apple SD Gothic NEO', helvetica, sans-serif`,
    heading: `Montserrat_ExtraBold, Black Han Sans`,
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    // "body": 400,
    // "bold": 700,
    heading: 400,
  },
  // Footer: {
  //   ul: {
  //     background: 'yellow'
  //   }

  // },
  styles: {
    root: {
      // margin: 0,
      // padding: 0,
      fontSize: 2
    },
    // a: {
    //   color: '#007acc'

    // },
    a: {
      // boxShadow: '0 1px 0 0 currentColor',
      color: '#007acc',
      textDecoration: 'none'
    },

    // body: {
    //   margin: 0,
    //   padding: 0
    // },
    blockquote: {


      marginLeft: ['-1.3125rem', '-1.75rem'],
      marginRight: [0, '1.75rem'],
      marginTop: 0,
      paddingBottom: 0,
      paddingLeft: ['0.98438rem', '1.42188rem'],
      paddingRight: 0,
      paddingTop: 0,
      marginBottom: '1.75rem',

      // background: ['orange', 'green'],
      // borderLeft: 5.25
      fontStyle: 'italic',
      borderLeft: '0.32813rem solid',
      borderColor: 'text',

      // borderLeft: '0.32813rem solid hsla(0,0%,0%,0.9)',

      // border-left: 0.32813rem solid hsla(0,0%,0%,0.9);

      fontSize: '1.20112rem',
      fontWeight: 600,
      // lineHeight: '1.75rem',
      lineHeight: '2rem',
      fontFamily: `'Merriweather','Georgia', 'Noto Serif KR',serif`,

      // @media only screen and (max-width: 480px) {
      //   blockquote {
      //     margin-left: -1.3125rem !important;
      //     margin-right: 0 !important;
      //     padding-left: 0.98438rem !important;
      //   }
      // }

      // font-size: 1.20112rem;
      // line-height: 1.75rem;
      // color: hsla(0,0%,0%,0.59);
      // font-style: italic;
      // border-left: 0.32813rem solid hsla(0,0%,0%,0.9);
    },
    pre: {
      p: '1.3125rem',
      borderRadius: [0, '0.3em'],
    }

  },


  prism: {
    CodeBlock: {
      background: 'yellow',
    },
    // border: '5px solid red'
    marginBottom: '1.75rem',
    marginLeft: '-1.3125rem',
    marginRight: '-1.3125rem',
    // margin-left: -1.3125rem;
    // margin-right: -1.3125rem;


    borderRadius: 0,
  }
});

merged = merge(merged, wavesTheme)


merged.sizes = {
  "container": 630
};

merged.breakpoints = [
  '672px',
];

// breakpoints: [
//   '40em', '56em', '64em',
// ],

merged.fontSizes = [
  12.154524686917982,
  13.32085131842997,
  16,
  23.08319849451542,
  27.725793726205854,
  40,
  64.2456
]

merged.space = [
  0,
  7,
  14,
  28,
  56,
  112,
  224,
  21,
  42,
];




console.log(JSON.stringify(merged, null, 2))

export default merged;