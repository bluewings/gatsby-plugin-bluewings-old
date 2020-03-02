// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/posts.js
import React, { Fragment } from 'react';
import { Link } from 'gatsby';
import { Styled, css } from 'theme-ui';
import Layout from 'gatsby-theme-blog/src/components/layout';
import SEO from 'gatsby-theme-blog/src/components/seo';
import Footer from 'gatsby-theme-blog/src/components/home-footer';

const Posts = ({ location, posts, siteTitle, socialLinks }) => (
  <Layout location={location} title={siteTitle}>
    <main>
      {posts.map(({ node }) => {
        const title = node.title || node.slug;
        const keywords = node.keywords || [];
        return (
          <Fragment key={node.slug}>
            <SEO title="Home" keywords={keywords} />
            <div>
              <Styled.h3 css={css({ mt: 4, mb: 1 })}>
                <Styled.a as={Link} css={css({ boxShadow: 'none', textDecoration: `none` })} to={node.slug}>
                  {title}
                </Styled.a>
              </Styled.h3>
              <small css={css({ fontFamily: `Montserrat_SemiBold, 'Apple SD Gothic NEO', helvetica, sans-serif` })}>
                {node.date}
              </small>
              <Styled.p>{node.excerpt}</Styled.p>
            </div>
          </Fragment>
        );
      })}
    </main>
    <Footer socialLinks={socialLinks} />
  </Layout>
);

export default Posts;
