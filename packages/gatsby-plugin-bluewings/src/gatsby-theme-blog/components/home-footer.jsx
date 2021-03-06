// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog/src/components/home-footer.js
import React, { Fragment } from 'react';
import { Styled, css } from 'theme-ui';

const Footer = ({ socialLinks = [], marginTop }) => (
  <footer
    css={css({
      mt: typeof marginTop !== 'undefined' ? marginTop : 4,
      pt: 3,
    })}
  >
    © {new Date().getFullYear()}, Powered by
    {` `}
    <Styled.a href="https://www.gatsbyjs.org">Gatsby</Styled.a>
    {` `}&bull;{` `}
    {socialLinks.map((platform, i, arr) => (
      <Fragment key={platform.url}>
        <Styled.a href={platform.url} target="_blank" rel="noopener noreferrer">
          {platform.name}
        </Styled.a>
        {arr.length - 1 !== i && (
          <Fragment>
            {` `}&bull;{` `}
          </Fragment>
        )}
      </Fragment>
    ))}
  </footer>
);

export default Footer;
