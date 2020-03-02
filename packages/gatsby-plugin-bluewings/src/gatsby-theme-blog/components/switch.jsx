import React, { useMemo, useRef } from 'react';
import { css, useColorMode, Styled } from 'theme-ui';

const switchSize = 60;

function Switch () {

  const [colorMode, setColorMode] = useColorMode();

const rotate = useRef(0);

  const toggleStyle = useMemo(() => {
    const remain = Math.abs(rotate.current % 360);
    if ((colorMode === 'light' && remain === 180) || (colorMode === 'dark' && remain === 0)) {
      rotate.current -= 180;
    }
    return { 
      // border: '1px solid blue',
      // position: 'relative',
      // width: SWITCH_WIDTH,
      // height: SWITCH_WIDTH,
      transform: `rotate(${rotate.current}deg)` };
  }, [colorMode]);

  const isDark = colorMode === `dark`;
  const toggleColorMode = (e) => {
    setColorMode(isDark ? `light` : `dark`);
  };

  return (
    <div css={css({  height: 0 })}>

    <button type="button" css={css({
          width: switchSize,
          height: switchSize/ 2,
          padding: 0,
          border: 'none',
          background: 'transparent',
          overflow: 'hidden',
          cursor: 'pointer',
    })}
    onClick={toggleColorMode}
    >
      <div className="spinner" css={css({
           pointerEvents: 'none',
           position: 'relative',
           width: switchSize,
           height: switchSize,
           // background: 'orange',
           transition: 'transform 0.67s linear',
           fontSize: 3,    
      })} style={toggleStyle}>
        <span className="sun" css={css({
                      position: 'absolute',
                      pointerEvents: 'none',
                      top: 0,
                      left: 0,
                      width: switchSize,
                      height: switchSize/ 2,
                      display: 'flex',
                      // background: 'lightblue',
                      justifyContent: 'center',
                      alignItems: 'center'
        })}>
        🌞
        </span>
        <span className="moon" css={css({
                        position: 'absolute',
                        pointerEvents: 'none',
                        top: switchSize/ 2,
                        left: 0,
                        width: switchSize,
                        height: switchSize/ 2,
                        display: 'flex',
                        // background: 'lightyellow',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: 'rotate(180deg)'
        })}>
        🌛
        </span>
      </div>
    </button>
    </div>
  )

}

export default Switch;