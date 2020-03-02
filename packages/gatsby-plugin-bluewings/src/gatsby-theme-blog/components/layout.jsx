// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/layout.js
import React from 'react';
import { css, Styled } from 'theme-ui';
import Header from './header';

export default ({ children, maxWidth, ...props }) => {
  return (
    <Styled.root
      css={css({
        px: 7,
        py: 8,
      })}
    >
      <Header {...props} maxWidth={maxWidth} />
      <div
        css={css({
          maxWidth: maxWidth || `container`,
          mx: `auto`,
        })}
      >
        {children}
      </div>
    </Styled.root>
  );
};
