// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/header.js
import React from 'react';
import { Link } from 'gatsby';
import { css, Styled } from 'theme-ui';
import Switch from 'gatsby-theme-blog/src/components/switch';
import Bio from 'gatsby-theme-blog/src/components/bio';

const rootPath = `${__PATH_PREFIX__}/`;

const Title = ({ children, location }) => {
  if (location.pathname === rootPath) {
    return (
      <Styled.h1
        css={css({
          mt: 0,
          mb: 3,
          pb: 2,
          fontSize: 6,
          wordBreak: 'keep-all',
        })}
      >
        <Styled.a
          as={Link}
          css={css({
            color: `inherit`,
            boxShadow: `none`,
            textDecoration: `none`,
          })}
          to={`/`}
        >
          {children}
        </Styled.a>
      </Styled.h1>
    );
  } else {
    return (
      <Styled.h3
        as="p"
        css={css({
          my: 0,
          wordBreak: 'keep-all',
        })}
      >
        <Styled.a
          as={Link}
          css={css({
            boxShadow: `none`,
            textDecoration: `none`,
            color: 'text',
          })}
          to={`/`}
        >
          {children}
        </Styled.a>
      </Styled.h3>
    );
  }
};

export default ({ children, title, maxWidth, ...props }) => (
  <header>
    <div
      css={css({
        maxWidth: maxWidth || `container`,
        mx: `auto`,
      })}
    >
      <div
        css={css({
          display: `flex`,
          justifyContent: `space-between`,

          alignItems: `flex-start`,

          my: 0,
        })}
      >
        <Title {...props}>{title}</Title>
        {children}
        <Switch />
      </div>
      {props.location.pathname === rootPath && <Bio />}
    </div>
  </header>
);
