// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog-core/gatsby-node.js

const withDefaults = (themeOptions) => {
  const basePath = themeOptions.basePath || `/`;
  const contentPath = themeOptions.contentPath || `content/posts`;
  const assetPath = themeOptions.assetPath || `content/assets`;
  const langKeyDefault = themeOptions.langKeyDefault || `en`;

  return {
    basePath,
    contentPath,
    assetPath,
    langKeyDefault,
  };
};

const PostTemplate = require.resolve(`./src/templates/post-query`);
const PostsTemplate = require.resolve(`./src/templates/posts-query`);

const createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions;
  const { basePath, langKeyDefault } = withDefaults(themeOptions);

  const result = await graphql(`
    {
      allBlogPost: allMdxBlogPost(sort: { fields: [date, title], order: DESC }, limit: 1000) {
        edges {
          node {
            id
            slug
            fields {
              langKey
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic(result.errors);
  }

  // // Create Posts and Post pages.
  const { allBlogPost } = result.data;
  const posts = allBlogPost.edges;

  // const translationsByDirectory = posts.reduce((accum, post) => {
  //   const {
  //     directoryName,
  //     langKey
  //   } = post.node.fields;
  //   if (directoryName && langKey && langKey !== langKeyDefault) {
  //     (accum[directoryName] || (accum[directoryName] = [])).push(langKey);
  //   }
  //   return accum;
  // }, {});

  const langKeys = posts.map((post) => post.node.fields.langKey).filter((e, i, arr) => arr.indexOf(e) === i);

  console.log(posts);
  console.log(langKeys);

  // 언어별로 포스트를 모음
  Object.entries(
    posts.reduce((accum, post) => {
      const langKey = post.node.fields.langKey;
      return {
        ...accum,
        [langKey]: [...(accum[langKey] || []), post],
      };
    }, {}),
  ).forEach(([langKey, posts]) => {
    // Create a page for each Post
    posts.forEach(({ node: post }, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1];
      const next = index === 0 ? null : posts[index - 1];
      const { slug } = post;
      createPage({
        path: slug,
        component: PostTemplate,
        context: {
          id: post.id,
          previousId: previous ? previous.node.id : undefined,
          nextId: next ? next.node.id : undefined,
        },
      });
    });

    // // Create the Posts page
    const path = langKey === langKeyDefault ? basePath : `${basePath.replace(/\/$/, '')}/${langKey}`;

    console.log('>> createPage', path);
    createPage({
      path,
      component: PostsTemplate,
      context: {
        langKey,
      },
    });
  });

  // posts.map((post) => post.node.fields.langKey).filter((e, i, arr) => arr.indexOf(e) === i)

  // langKeyDefault

  // // // Create the Posts page
  // createPage({
  //   path: basePath,
  //   component: PostsTemplate,
  //   context: {},
  // })
};

export { createPages };
