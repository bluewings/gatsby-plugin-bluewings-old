import './typography.css';
import blogTheme from 'gatsby-theme-blog/src/gatsby-plugin-theme-ui/index';
import wavesTheme from "gatsby-theme-waves/src/gatsby-plugin-theme-ui/index"
import nightOwl from '@theme-ui/prism/presets/oceanic-next.json'
// import nightOwl from '@theme-ui/prism/presets/night-owl.json'
import solarizedLight from '@theme-ui/prism/presets/prism.json'
// import prism from '@theme-ui/prism/presets/theme-ui/'
import merge from 'deepmerge';
import colors from './colors';

// import wavesTheme from "gatsby-theme-waves/src/gatsby-plugin-theme-ui/index"
// import blogTheme from "gatsby-plugin-bluewings/src/gatsby-plugin-theme-ui/index"
// import merge from "deepmerge"



// console.log('>>> colors', colors)

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
    // code: {
    //   // ...nightOwl,
    //   // ...prism,
    //   ...solarizedLight,
    // },
    // modes: {
    //   dark: {
    //     code: {
          
    //     }
    //   }
    // },
    root: {
      margin: 0,
      padding: 0
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
      lineHeight: '1.75rem',
      fontFamily: `'Merriweather','Georgia',serif`,
      fontWeight: 600,

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

      // marginBottom: '1.75rem',
      // marginLeft: '-1.3125rem',
      // marginRight: '-1.3125rem',
      mb: '1.75rem',
      ml: '-1.3125rem',
      mr: '-1.3125rem',
      p: '1.3125rem',
      borderRadius: [0, '0.3rem'],
      '&.prism-code': {
        '.token-line-highlight': {
          // background: 'yellow',
          // display: block;
          mr: '-1.3125rem',
          ml: '-1.3125rem',
          pr: '1rem',
          pl: '0.98437rem',
          // bg: 'hsla(0,0%,100%,.125)',
          borderLeft: '0.32813rem solid #FAC863'
          // }

        },
        '&.light': {
          ...nightOwl,
          '.token-line-highlight': {
            // background: 'yellow',
            // display: block;
            // mr: '-1.3125rem',
            // ml: '-1.3125rem',
            // pr: '1rem',
            // pl: '0.98437rem',
            bg: 'hsla(0,0%,100%,.125)',
            // borderLeft: '0.32813rem solid #FAC863'
            // }

          }
        },
        '&.dark': {

 
          ...solarizedLight,
          // '.tag': {
          //   '.punctuation': {
          //     color: '#999'
          //   },
          // },
          backgroundColor: '#fdf6e3',
          '.punctuation': {
            color: '#999 !important'
          },

          // backgroundColor: 'box'
          '.token-line-highlight': {


            bg: 'rgba(0,0,0,.1)',
            borderLeftColor: 'rgba(0,0,0,.5)',
    // border-left: .32813rem solid rgba(0,0,0,.5);
          }
        }
        
      }
    },


  },

  // prism: {
  //   background: 'yellow',
  //   '.gatsby-highlight-code-line': {
  //     // background: 'yellow',

  //     display: 'block',
  //     marginRight: '-1.3125rem',
  //     marginLeft: '-1.3125rem',
  //     paddingRight: '1em',
  //     paddingLeft: '0.98437rem;',
  //     backgroundColor: 'hsla(0,0%,100%,.125)',
  //     borderLeft: '0.32813rem solid #f8c555',
  //   }
  // }

  // prism: {

  // }



});
// merged.styles.prism = merged.prism;
delete merged.prism;

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




console.log(JSON.stringify(merged.styles.code, null, 2))

export default merged;