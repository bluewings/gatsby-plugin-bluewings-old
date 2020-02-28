const grid = {
  import: [`import { Bluewings } from 'gatsby-plugin-bluewings'`],
  open: (all) => {
    const {
      // props: {},
      isFirst,
      args,
      params: {
        layoutFixed
      },
    } = all;
    return {
      type: 'jsx',
      value: `

      ${isFirst ? '<Bluewings.Row>' : ''}
      
<Bluewings.Column args={${JSON.stringify(args)}} layoutFixed={${!!layoutFixed}}>




      `,
    };
  },
  close: (props) => {
    const {
      finale
    } = props;
    return {
      type: 'jsx',
      value: `
      
      </Bluewings.Column>
      ${finale ? '</Bluewings.Row>' : ''}
      `,
    };
  },
};

const section = {
  import: null,
  open: ({
    className
  }) => {
    return {
      type: 'jsx',
      value: `<section className="${className}">`,
    };
  },
  close: {
    type: 'jsx',
    value: '</section>',
  },
};

const context = {
  import: `import { Bluewings } from 'gatsby-plugin-bluewings'`,
  open: {
    type: 'jsx',
    value: '<Bluewings.DataProvider>',
  },
  close: {
    type: 'jsx',
    value: '</Bluewings.DataProvider>',
  },
};

// next = <DataProvider>{next}</DataProvider>;

const customTags = {
  grid,
  section,
  context,


};


export default customTags
// export {
//   customTags
// }

// module.exports = customTags;