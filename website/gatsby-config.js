module.exports = {
  plugins: [
    // {
    //   resolve: 'gatsby-plugin-bluewings',
    //   options: {
    //     wow: 'test',
    //     // langKeyDefault: '',
    //   },
    // },
    "gatsby-theme-waves",
  ],
  // Customize your site metadata:
  siteMetadata: {
    title: `My Blog Title`,
    author: `My Name`,
    description: `My site description...`,
    social: [{
        name: `twitter`,
        url: `https://twitter.com/gatsbyjs`,
      },
      {
        name: `github`,
        url: `https://github.com/gatsbyjs`,
      },
    ],
  },
}