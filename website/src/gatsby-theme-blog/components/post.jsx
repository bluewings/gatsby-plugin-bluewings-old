// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/post.js
import React from "react"
import { Styled, css } from "theme-ui"

import PostFooter from "gatsby-theme-blog/src/components/post-footer"
import Layout from "gatsby-theme-blog/src/components/layout"
import SEO from "gatsby-theme-blog/src/components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"

const Post = ({
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
}) => {
  const {
    post,
    site: {
      siteMetadata: { title },
    },
  } = data
  console.log(data)
  const langKey = post && post.fields && post.fields.langKey
  return (
    <Layout location={location} title={title} langKey={langKey}>
      <SEO title={post.title} description={post.excerpt} />
      <main>
        <Styled.h1>{post.title}</Styled.h1>
        <Styled.p
          css={css({
            fontSize: 1,
            mt: -3,
            mb: 3,
          })}
        >
          {post.date}
        </Styled.p>
        <MDXRenderer>{post.body}</MDXRenderer>
      </main>
      <PostFooter {...{ previous, next }} />
    </Layout>
  )
}

export default Post
