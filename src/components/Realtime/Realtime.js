import React, { useState, useEffect, useRef, useContext } from 'react';
import { ModelContext } from '../context/model-context';

import useWebcam from './useWebcam';
import useBoxRenderer from './useBoxRenderer';

const Realtime = () => {
  const { model, labels } = useContext(ModelContext);
  const videoRef = useRef()
  const canvasRef = useRef()
  const [dimensions, setDimensions] = useState(() => { 
    if (window.innerWidth > 1000) {
        return {
            height: 600,
            width: 600
        }
    } else if (window.innerWidth > 800) {
        return {
            height: 500,
            width: 500
        }
    } else {
        return {
            height: 300,
            width: 300
        }
    }
  })

  useEffect(() => {
      function handleResize() {
          if (window.innerWidth > 1000) {
              setDimensions({
                  height: 600,
                  width: 600
              });
          } else if (window.innerWidth > 800) {
              setDimensions({
                  height: 500,
                  width: 500
              });
          } else {
              setDimensions({
                  height: 300,
                  width: 300
              });
          }
      }

      window.addEventListener('resize', handleResize)

      return _ => {
          window.removeEventListener('resize', handleResize)
      }
  });

  const cameraLoaded = useWebcam(model, videoRef)
  useBoxRenderer(model, videoRef, canvasRef, cameraLoaded, labels)

  return (
    <div>
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
          }}>
              <div style={{
                  width:'100%',
                  height:'100%',
                  position:'relative',
              }}>
                  <video
                      autoPlay
                      playsInline
                      muted
                      ref={videoRef}
                      width={dimensions.width}
                      height={dimensions.height} 
                      style={{
                          position:'absolute',
                          top:'0px',
                          left:'0px',
                      }}
                  />
                  <canvas 
                      width={dimensions.width}
                      height={dimensions.height} 
                      style={{
                          position:'absolute',
                          top:'0px',
                          left:'0px',
                      }} 
                      ref={canvasRef}
                  />
          </div>
          </div>
        </div>
    </div>
  )
}

export default Realtime;