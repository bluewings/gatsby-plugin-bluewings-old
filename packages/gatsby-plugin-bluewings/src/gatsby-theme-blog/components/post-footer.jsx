// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/post-footer.js
import React from "react"
import { Link } from "gatsby"
import { css, Styled, Flex } from "theme-ui"
import Bio from "gatsby-theme-blog/src/components/bio"

const Footer = ({ previous, next }) => (
  <footer
    css={css({
      mt: 4,
      pt: 3,
    })}
  >
    <Styled.hr />
    <Bio post={true} />
    {(previous || next) && (
      <Flex
        as="ul"
        css={css({
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          // padding: 0,
          p: 0,
          mt: 0,
          mb: 3,
        })}
      >
        <li css={css({
          mb: 2
        })}>
          {previous && (
            <Styled.a as={Link} to={previous.slug} rel="prev">
              ← {previous.title}
            </Styled.a>
          )}
        </li>
        <li css={css({
          mb: 2
        })}>
          {next && (
            <Styled.a as={Link} to={next.slug} rel="next">
              {next.title} →
            </Styled.a>
          )}
        </li>
      </Flex>
    )}
  </footer>
)

export default Footer