import React, { useState, useEffect, useRef, useContext } from 'react';
import * as tf from '@tensorflow/tfjs';
import { ModelContext } from '../context/model-context';

import useWebcam from './useWebcam';
import useBoxRenderer from './useBoxRenderer';

const MODEL_URL = process.env.PUBLIC_URL + '/face_detection/';
const LABELS_URL = MODEL_URL + 'labels.json';
const MODEL_JSON = MODEL_URL + 'model.json';

const Realtime = () => {
  const { model, fetchModel, labels, fetchLabels } = useContext(ModelContext);
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

  const loadModel = async () => {
    const model = await tf.loadGraphModel(MODEL_JSON);
    fetchModel(model);
    const response = await fetch(LABELS_URL);
    let labels = await response.json();
    fetchLabels(labels)
  }

  return (
    <div>
      {!model && (
        <div>
            <button onClick={loadModel}>Load Model</button>
        </div>
      )}
      <h1>Test</h1>
      <h1>Test</h1>
      <h1>Test</h1>
      {model && (
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
      )}
    </div>
  )
}

export default Realtime;