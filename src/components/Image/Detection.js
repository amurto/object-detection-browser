import React, { useRef, useContext, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { ModelContext } from '../context/model-context';
import useDetector from './useDetector';

const MODEL_URL = process.env.PUBLIC_URL + '/model_web/';
const LABELS_URL = MODEL_URL + 'labels.json';
const MODEL_JSON = MODEL_URL + 'model.json';

const Detection = () => {
    const { model, fetchModel, labels, fetchLabels } = useContext(ModelContext);
    const [loadedImg, setLoadedImg] = useState(null); 
    const imageRef = useRef();
    const canvasRef = useRef();

    useDetector(model, labels, loadedImg, imageRef, canvasRef)

    const loadModel = async () => {
        const model = await tf.loadGraphModel(MODEL_JSON);
        fetchModel(model);
        const response = await fetch(LABELS_URL);
        let labels = await response.json();
        fetchLabels(labels)
    }

    const onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setLoadedImg(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div>
            {!model && (
                <div>
                    <button onClick={loadModel}>Load Model</button>
                </div>
            )}
            {model && (
                <div>
                    <input
                        accept="image/*"
                        type="file"
                        onChange={onSelectFile}
                    />
                    <div>
                        {loadedImg && (
                            <div>
                                <img ref={imageRef} src={loadedImg} alt="test"  />
                                <canvas ref={canvasRef} width="500" height="500" />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Detection;