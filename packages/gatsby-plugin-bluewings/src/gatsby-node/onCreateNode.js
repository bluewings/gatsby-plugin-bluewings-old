// https://github.com/angeloocana/gatsby-plugin-i18n/blob/master/packages/gatsby-plugin-i18n/src/onCreateNode.js
// import defaultOptions from './defaultOptions';
import { isInPagesPaths, getSlugAndLang } from 'ptz-i18n';
import Result from 'folktale/result';
import { isNil, chain } from 'ramda';

const defaultOptions = {
  langKeyForNull: 'any',
  langKeyDefault: 'en',
  useLangKeyLayout: false,
  pagesPaths: ['/content/posts'],
  prefixDefault: true,
};

const getValidFile = (filePath) => (isNil(filePath) ? Result.Error('No file name') : Result.Ok(filePath));

/**
 * Add custom url pathname for blog posts.
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {void} void
 */
const onCreateNode = ({ node, actions, getNode }, pluginOptions) => {
  const options = {
    ...defaultOptions,
    ...pluginOptions,
  };

  const getParentType = (node) => {
    const parent = node && node.parent && getNode(node.parent);
    return parent && parent.internal && parent.internal.type;
  };

  console.log(node.internal.type);

  if (node.internal.type === 'Site') {
    console.log(node);

    if (node.siteMetadata && !node.siteMetadata.langKeyDefault) {
      node.siteMetadata.langKeyDefault = options.langKeyDefault;
    }
  }

  const getFilePath = (node) => {
    switch (node.internal.type) {
      case 'File':
        return getValidFile(node.absolutePath);
      case 'MarkdownRemark':
      case 'Mdx':
        return getValidFile(node.fileAbsolutePath);
      default:
        break;
    }
    if (getParentType(node) === 'Mdx') {
      return getValidFile(getNode(node.parent).fileAbsolutePath);
    }
    return Result.Error('Skiping file type: ' + node.internal.type);
  };

  return getFilePath(node)
    .map((filePath) =>
      chain((isInPaths) => {
        if (isInPaths === false) {
          return 'Skipping page, not in pagesPaths';
        }

        const slugAndLang = getSlugAndLang(options, filePath);

        const { createNodeField } = actions;

        if (node.internal.type === 'MarkdownRemark' || node.internal.type === 'Mdx' || getParentType(node) === 'Mdx') {
          createNodeField({
            node,
            name: 'langKey',
            value: slugAndLang.langKey,
          });
          node.slug = slugAndLang.slug;
        }

        createNodeField({
          node,
          name: 'slug',
          value: slugAndLang.slug,
        });

        return 'langKey and slug added';
      }, isInPagesPaths(options, filePath)),
    )
    .merge();
};

export { onCreateNode };
