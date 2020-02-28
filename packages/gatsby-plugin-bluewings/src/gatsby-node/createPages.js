// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog-core/gatsby-node.js


const withDefaults = themeOptions => {
  const basePath = themeOptions.basePath || `/`
  const contentPath = themeOptions.contentPath || `content/posts`
  const assetPath = themeOptions.assetPath || `content/assets`

  return {
    basePath,
    contentPath,
    assetPath,
  }
}

const createPages = async ({
  graphql,
  actions,
  reporter
}, themeOptions) => {
  const {
    createPage
  } = actions
  const {
    basePath
  } = withDefaults(themeOptions)

  const result = await graphql(`
    {
      allBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  // Create Posts and Post pages.
  const {
    allBlogPost
  } = result.data
  const posts = allBlogPost.edges

  // Create a page for each Post
  posts.forEach(({
    node: post
  }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    const next = index === 0 ? null : posts[index - 1]
    const {
      slug
    } = post
    createPage({
      path: slug,
      component: PostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })

  // // Create the Posts page
  createPage({
    path: basePath,
    component: PostsTemplate,
    context: {},
  })
}

export {
  createPages
};