// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog-core/gatsby-node.js

const withDefaults = (themeOptions: any) => {
  const basePath = themeOptions.basePath || `/`;
  const contentPath = themeOptions.contentPath || `content/posts`;
  const assetPath = themeOptions.assetPath || `content/assets`;
  const langKeyDefault = themeOptions.langKeyDefault || `en`;
  let editOnGithub: string | null = null;
  if (themeOptions.editOnGithub) {
    const { url, directory = '', branch = 'master' } = themeOptions.editOnGithub;
    if (url) {
      editOnGithub = [url.replace(/\/$/, ''), 'edit', branch, directory.replace(/(^\/|\/$)/g, '')]
        .filter((e) => e)
        .join('/');
    }
  }
  return {
    ...themeOptions,
    basePath,
    contentPath,
    assetPath,
    langKeyDefault,
    editOnGithub,
  };
};

const PostTemplate = require.resolve(`./src/templates/post-query`);
const PostsTemplate = require.resolve(`./src/templates/posts-query`);

const createPages = async ({ graphql, actions, reporter }: any, themeOptions: any) => {
  const { createPage } = actions;
  const { basePath, langKeyDefault, editOnGithub } = withDefaults(themeOptions);

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

  // Create Posts and Post pages.
  const { allBlogPost } = result.data;

  const getOrigin = (slug: string, langKey: string) => slug.replace(new RegExp('^/' + langKey), '');
  const translationsDict: any = allBlogPost.edges.reduce((accum: any, { node: { slug, fields: { langKey } } }: any) => {
    const origin = getOrigin(slug, langKey);
    return { ...accum, [origin]: [...(accum[origin] || []), { origin, slug, langKey }] };
  }, {});

  // group posts by langKey
  Object.entries(
    allBlogPost.edges.reduce(
      (accum: any, post: any) => ({
        ...accum,
        [post.node.fields.langKey]: [...(accum[post.node.fields.langKey] || []), post],
      }),
      {},
    ),
  ).forEach(([langKey, posts]: [string, any]) => {
    // Create a page for each Post
    posts.forEach(({ node: post }: any, index: number) => {
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
          translations: translationsDict[getOrigin(slug, langKey)] || [],
          editOnGithub,
          langKeyDefault,
        },
      });
    });

    // Create the Posts page
    const path = langKey === langKeyDefault ? basePath : `${basePath.replace(/\/$/, '')}/${langKey}`;
    createPage({
      path,
      component: PostsTemplate,
      context: {
        langKey,
      },
    });
  });
};

export { createPages };
