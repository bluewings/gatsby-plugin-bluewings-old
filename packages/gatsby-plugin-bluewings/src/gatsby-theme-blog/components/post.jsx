// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/post.js
import React from 'react';
import { Styled, css } from 'theme-ui';
import { DiscussionEmbed } from 'disqus-react';
import PostFooter from 'gatsby-theme-blog/src/components/post-footer';
import Layout from 'gatsby-theme-blog/src/components/layout';
import SEO from 'gatsby-theme-blog/src/components/seo';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Translations from './translations';

const Post = (all) => {
  const {
    // data: {
    //   post,
    //   site: {
    //     siteMetadata: { title },
    //   },
    // },
    data,
    location,
    previous,
    next,
    pageContext,
  } = all;
  console.log('>>>', all);
  const {
    post,
    site: {
      siteMetadata: { title },
    },
  } = data;
  console.log('%c-=-=-=-=-=-=-=-=-', 'background:yellow');
  // console.log({ data, post, pageContext })
  // console.log(post.parent && post.parent.frontmatter)
  const { langKey, filePath } = post.fields || {};
  const { translations, editOnGithub, disqusShortname } = pageContext || {};
  const { max_width } = (post.parent && post.parent.frontmatter) || {};
  console.log({ max_width });
  //   editOnGithub: "https://github.com/bluewings/dev-dad/edit/master"
  // langKeyDefault: "en"
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
        
        >{post.title}</Styled.h1>
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
          filePath={filePath}
          editOnGithub={editOnGithub}
        />
        {/* <pre>{JSON.stringify({ langKey, translations })}</pre> */}
        <MDXRenderer>{post.body}</MDXRenderer>
      </main>
      <PostFooter {...{ previous, next }} />
      {disqusShortname && (
        <DiscussionEmbed
          shortname={disqusShortname}
          config={{
            identifier: post.id,
            title: title,
          }}
        />
      )}
    </Layout>
  );
};

export default Post;
