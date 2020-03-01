// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/layout.js
import React from 'react';
import { css, Styled } from 'theme-ui';
import Header from './header';

export default ({ children, maxWidth, ...props }) => {
  return (
    <Styled.root>
      <Header {...props} maxWidth={maxWidth} />
      <div>
        <div
          css={css({
            maxWidth: maxWidth || `container`,
            mx: `auto`,
            px: 3,
            py: 4,
          })}
        >
          {children}
        </div>
      </div>
    </Styled.root>
  );
};
