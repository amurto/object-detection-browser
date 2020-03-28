import React, { useRef, useContext } from 'react';
import * as tf from '@tensorflow/tfjs';
import { ModelContext } from '../context/model-context';

import useWebcam from './useWebcam';
import useBoxRenderer from './useBoxRenderer';

import styles from './styles.module.css'
const MODEL_URL = process.env.PUBLIC_URL + '/model_web/';
const LABELS_URL = MODEL_URL + 'labels.json';
const MODEL_JSON = MODEL_URL + 'model.json';

const Realtime = () => {
  const { model, fetchModel, labels, fetchLabels } = useContext(ModelContext);
  const videoRef = useRef()
  const canvasRef = useRef()

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
          margin: '0 auto',
          position: 'relative'
        }}>
          <video
            className={styles.fixed}
            autoPlay
            playsInline
            muted
            ref={videoRef}
            width="500"
            height="500"
          />
          <canvas
            className={styles.fixed}
            ref={canvasRef}
            width="500"
            height="500"
          />
        </div>
      )}
    </div>
  )
}

export default Realtime;
