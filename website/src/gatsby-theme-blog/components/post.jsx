// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/post.js
import React from "react"
import { Styled, css } from "theme-ui"

import PostFooter from "gatsby-theme-blog/src/components/post-footer"
import Layout from "gatsby-theme-blog/src/components/layout"
import SEO from "gatsby-theme-blog/src/components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Translations from "./translations"

const Post = all => {
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
  } = all
  console.log(">>>", all)
  const {
    post,
    site: {
      siteMetadata: { title },
    },
  } = data
  console.log("%c-=-=-=-=-=-=-=-=-", "background:yellow")
  console.log({ data, post, pageContext })
  const { langKey, filePath } = post.fields || {}
  const { translations, editOnGithub } = pageContext || {}

  //   editOnGithub: "https://github.com/bluewings/dev-dad/edit/master"
  // langKeyDefault: "en"
  return (
    <Layout location={location} title={title} langKey={langKey}>
      <SEO title={post.title} description={post.excerpt} />
      <main>
        <h1>---- cut here 1 -----</h1>
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
        <h1>---- cut here 2 -----</h1>
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
    </Layout>
  )
}

export default Post
