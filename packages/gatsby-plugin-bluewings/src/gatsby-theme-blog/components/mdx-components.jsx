import React from 'react';
import { Styled, css } from 'theme-ui';

const mdxComponents = {
  p: (props) => {
    // console.log(props)
    return <Styled.p {...props} style={{ border: '1px solid blue' }} />;
  },
  // pre: (props) => {
  //   return <h2>pre</h2>
  // },
};

export default mdxComponents;
