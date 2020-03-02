// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/post.js
import React from 'react';
import { Styled, css } from 'theme-ui';
import { DiscussionEmbed } from 'disqus-react';
import PostFooter from 'gatsby-theme-blog/src/components/post-footer';
import Layout from 'gatsby-theme-blog/src/components/layout';
import SEO from 'gatsby-theme-blog/src/components/seo';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import mdxComponents from './mdx-components';
import Translations from './translations';
import Footer from 'gatsby-theme-blog/src/components/home-footer';

const Post = (all) => {
  const { data, location, previous, next, pageContext } = all;
  console.log('>>>', all);
  const {
    post,
    site: {
      siteMetadata: { title, social: socialLinks },
    },
  } = data;
  const { langKey, filePath } = post.fields || {};
  const { translations, editOnGithub, disqusShortname, langKeyDefault } = pageContext || {};
  const { max_width } = (post.parent && post.parent.frontmatter) || {};
  const editUrl = editOnGithub && filePath && `${editOnGithub}${filePath}`;
  return (
    <Layout location={location} title={title} langKey={langKey} maxWidth={max_width}>
      <SEO title={post.title} description={post.excerpt} />
      <main>
        <Styled.h1
          css={css({
            // fontSize: 1,
            mt: 4,
            // mb: 3,
          })}
        >
          {post.title}
        </Styled.h1>
        <Styled.p
          css={css({
            fontSize: 1,
            // mt: '-21px',
            mt: -2,
            mb: 3,
            fontFamily: `Montserrat_SemiBold, 'Apple SD Gothic NEO', helvetica, sans-serif`,
          })}
        >
          {post.date}
        </Styled.p>
        <Translations
          langKey={langKey}
          translations={translations}
          slug={post.slug}
          editUrl={editUrl}
          // filePath={filePath}
          // editOnGithub={editOnGithub}
          langKeyDefault={langKeyDefault}
        />
        {/* <pre>{JSON.stringify({ langKey, translations })}</pre> */}
        <MDXProvider components={mdxComponents}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
      </main>
      <PostFooter {...{ previous, next }} editUrl={editUrl} />
      {disqusShortname && (
        <DiscussionEmbed
          shortname={disqusShortname}
          config={{
            identifier: post.id,
            title: title,
          }}
        />
      )}
      <Footer socialLinks={socialLinks} marginTop={0} />
    </Layout>
  );
};

export default Post;
