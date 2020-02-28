import React from "react"
import { css, Styled } from "theme-ui"
import Header from "./header"

export default ({ children, maxWidth, ...props }) => {
  console.log(">>>> LAYOUT", props)
  console.log(maxWidth)
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
  )
}
