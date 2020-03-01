const tailwindcss = require('tailwindcss');

module.exports = (options) => {
  return {
    plugins: [
      'gatsby-theme-blog',
      {
        resolve: 'gatsby-plugin-mdx',
        options: {
          extensions: ['.mdx', '.md'],
          gatsbyRemarkPlugins: [
            {
              resolve: `${__dirname}/plugins/remark-snippet.js`,
            },
            {
              resolve: 'gatsby-remark-images',
              options: {
                maxWidth: 1380,
                linkImagesToOriginal: false,
              },
            },
            {
              resolve: 'gatsby-remark-copy-linked-files',
            },
            {
              resolve: 'gatsby-remark-smartypants',
            },
          ],
          remarkPlugins: [require('remark-slug')],
        },
      },
      {
        resolve: 'gatsby-plugin-sass',
        options: {
          postCssPlugins: [tailwindcss(`${__dirname}/tailwind.config.js`)],
        },
      },
      {
        resolve: 'gatsby-plugin-google-fonts',
        options: {
          fonts: ['Montserrat:800', 'Black Han Sans', 'Open Sans', 'Gothic A1:400,700', 'Noto Serif KR'],
        },
      },
      'gatsby-plugin-typescript',
    ],
  };
};
