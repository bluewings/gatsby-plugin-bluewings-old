const grid = {
  import: [
    `import { Bluewings } from 'gatsby-plugin-bluewings'`,
  ],
  open: (all) => {

    const {
      // props: {},
      isFirst,
      args,
      params: {
        layoutFixed,
      },
    } = all
    return {
      type: 'jsx',
      value: `

      ${isFirst ? '<Bluewings.Row>' : ''}
      
<Bluewings.Column args={${JSON.stringify(args)}} layoutFixed={${!!layoutFixed}}>




      `
    }
  },
  close: (props) => {
    const {
      finale
    } = props
    return {
      type: 'jsx',
      value: `
      
      </Bluewings.Column>
      ${finale ? '</Bluewings.Row>' : ''}
      `,
    }
  }
}


const section = {
  import: null,
  open: {
    type: 'jsx',
    value: `
<section style={{ border: "2px solid red", marginBottom: "1rem" }} >
    
    `
  },
  close: {
    type: 'jsx',
    value: '</section>',
  }
}

const customTags = {
  grid,
  section,
}

module.exports = customTags;