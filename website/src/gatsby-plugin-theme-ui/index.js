import wavesTheme from "gatsby-theme-waves/src/gatsby-plugin-theme-ui/index"
import blogTheme from "gatsby-plugin-bluewings/src/gatsby-plugin-theme-ui/index"
import blogTheme2 from "gatsby-theme-blog/src/gatsby-plugin-theme-ui/index"
import merge from "deepmerge"

const merged = merge(
  blogTheme, {
    // root: {
    //   // fontFamily: `body`,
    //   fontFamily:
    // },
    // fonts: {
    //   body: `'Open Sans', 'Gothic A1', 'Apple SD Gothic NEO', helvetica, sans-serif`,
    //   // heading: '"Avenir Next", sans-serif',
    //   heading: `Montserrat_Bold, Black Han Sans`,
    //   monospace: "Menlo, monospace",
    // },
    // fontWeights: {
    //   // "body": 400,
    //   // "bold": 700,
    //   heading: 400,
    // },
  },
  blogTheme,
  wavesTheme, {
    fonts: {
      body: `'Open Sans', 'Gothic A1', 'Apple SD Gothic NEO', helvetica, sans-serif`,
      heading: '"Avenir Next", sans-serif',
      monospace: "Menlo, monospace",
    },
  }
)

const merged1 = merge(merged, wavesTheme)

console.log("-=-=-=-=-=-=-2 ,3, 4, ")
console.log(JSON.stringify(merged, null, 2))
export default merged1