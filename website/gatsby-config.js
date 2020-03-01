module.exports = {
  // pathPrefix: '/gatsby-starter-mdx-blog',
  // Customize your site metadata:
  siteMetadata: {
    title: "개츠비 스타터 MDX",
    author: "My Name",
    description: "My site description...",
    social: [{
        name: "twitter",
        url: "https://twitter.com/gatsbyjs",
      },
      {
        name: "github",
        url: "https://github.com/gatsbyjs",
      },
    ],
  },
  plugins: [
    // "gatsby-theme-blog",
    {
      resolve: "gatsby-plugin-bluewings",
      options: {
        langKeyDefault: "en",
        // editOnGithub: {
        //   url: "https://github.com/bluewings/gatsby-plugin-bluewings",
        //   directory: "website",
        //   branch: "master",
        // },
        disqusShortname: "gatsby-starter-mdx-blog",
      },
    },
  ],
}