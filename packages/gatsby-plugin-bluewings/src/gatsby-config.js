const tailwindcss = require('tailwindcss');

module.exports = (options) => {
  // console.log(options)
  return {
    plugins: [{
        resolve: `gatsby-plugin-mdx`,
        options: {
          extensions: [`.mdx`, `.md`],
          gatsbyRemarkPlugins: [{
              resolve: `${__dirname}/plugins/remark-snippet.js`,
              options,
            },
            {
              resolve: `gatsby-remark-images`,
              options: {
                // should this be configurable by the end-user?
                maxWidth: 1380,
                linkImagesToOriginal: false,
              },
            },
            {
              resolve: `gatsby-remark-copy-linked-files`,
            },
            {
              resolve: `gatsby-remark-smartypants`,
            },
          ],
          remarkPlugins: [require(`remark-slug`)],
        },
      },
      {
        resolve: 'gatsby-theme-blog',
        options: {
          mdxOtherwiseConfigured: true,
        },
      },
      {
        // resolve: `${__dirname}/node_modules/gatsby-plugin-sass`,
        // resolve: `${__dirname}/../node_modules/gatsby-plugin-sass`,
        resolve: 'gatsby-plugin-sass',
        options: {
          postCssPlugins: [tailwindcss(`${__dirname}/tailwind.config.js`)],
        },
      },
      // {
      //   resolve: `gatsby-mdx`,
      //   options: {
      //     extensions: [`.mdx`, `.md`],
      //     gatsbyRemarkPlugins: [
      //       {
      //         resolve: `${__dirname}/src/plugins/remark-snippet.js`,
      //       },
      //       {
      //         resolve: `gatsby-remark-images`,
      //         options: {
      //           maxWidth: 590,
      //         },
      //       },
      //       {
      //         resolve: `gatsby-remark-responsive-iframe`,
      //         options: {
      //           wrapperStyle: `margin-bottom: 1.0725rem`,
      //         },
      //       },
      //       { resolve: `gatsby-remark-copy-linked-files` },
      //       { resolve: `gatsby-remark-smartypants` },
      //     ],
      //   },
      // },
    ],
  };
};