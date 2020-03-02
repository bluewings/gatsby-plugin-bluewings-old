// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/header.js
import React from 'react';
import { Link } from 'gatsby';
import { css, useColorMode, Styled } from 'theme-ui';
import Switch from "gatsby-theme-blog/src/components/switch"
import Bio from 'gatsby-theme-blog/src/components/bio';
import sun from "gatsby-theme-blog/assets/sun.png"
import moon from "gatsby-theme-blog/assets/moon.png"

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
          wordBreak: 'keep-all'
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
          wordBreak: 'keep-all'
        })}
      >
        <Styled.a
          as={Link}
          css={css({
            boxShadow: `none`,
            textDecoration: `none`,
            // color: `primary`,
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

const iconCss = [{ pointerEvents: `none`, margin: 4 }];

const checkedIcon = (
  <img
    alt="moon indicating dark mode"
    src={moon}
    width="16"
    height="16"
    role="presentation"
    css={iconCss}
  />
)

const uncheckedIcon = (
  <img
    alt="sun indicating light mode"
    src={sun}
    width="16"
    height="16"
    role="presentation"
    css={iconCss}
  />
)

export default ({ children, title, maxWidth, ...props }) => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === `dark`;
  const toggleColorMode = (e) => {
    setColorMode(isDark ? `light` : `dark`);
  };

  console.log(props);
  return (
    <header>
      <div
        css={css({
          maxWidth: maxWidth || `container`,
          mx: `auto`,
          // px: 3,
          // pt: 4,
          // background: 'lightblue'
        })}
      >
        <div
          css={css({
            display: `flex`,
            justifyContent: `space-between`,
            // alignItems: `center`,
            alignItems: `flex-start`,
            // mt: 0,
            // mb: 0,
            my: 0,
            // background: 'lightgreen'
          })}
        >
          <Title {...props}>{title}</Title>
          {children}
          <Switch
            aria-label="Toggle dark mode"
            checkedIcon={checkedIcon}
            uncheckedIcon={uncheckedIcon}
            checked={isDark}
            onChange={toggleColorMode}
          />
        </div>
        {props.location.pathname === rootPath && <Bio />}
      </div>
    </header>
  );
};
