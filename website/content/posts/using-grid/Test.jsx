import React from "react"

function Dummy({ text = "" }) {
  return (
    <div
      style={{
        display: "flex",
        background: "yellow",
        height: 200,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      'Test component'
    </div>
  )
}

export default Dummy
