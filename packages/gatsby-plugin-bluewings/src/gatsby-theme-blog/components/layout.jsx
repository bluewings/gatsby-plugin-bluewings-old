// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/layout.js
import React from 'react';
import { css, Styled } from 'theme-ui';
import Header from './header';

export default ({ children, maxWidth, ...props }) => {
  return (
    <Styled.root css={css({
      px: 7,
      py: 8,

    })}>
      


      {/* <div style={{border: '1px solid red', margin: '-1px'}}> */}
      {/* <div style={{background: 'lightyellow'}}> */}
      <Header {...props} maxWidth={maxWidth} />
      <div style={{
        // background: 'yellow'
      }}>
        <div
          css={css({
            maxWidth: maxWidth || `container`,
            mx: `auto`,
            // px: 3,
            // py: 4,
            // background: '#fff'
          })}
        >
          {children}
        </div>
      </div>
      {/* </div> */}
    </Styled.root>
  );
};
