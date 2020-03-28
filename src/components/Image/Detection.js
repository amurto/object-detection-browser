import React, { useRef, useContext, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { ModelContext } from '../context/model-context';
import useDetector from './useDetector';
import MagicDropzone from 'react-magic-dropzone';

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

    const onDrop = (accepted, rejected, links) => {
        if (accepted && accepted.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setLoadedImg(reader.result);
            });
            reader.readAsDataURL(accepted[0]);
        }
    }

    return (
        <div>
            {!model && (
                <div>
                    <button onClick={loadModel}>Load Model</button>
                </div>
            )}
            {model && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <MagicDropzone
                        accept="image/jpeg, image/png, .jpg, .jpeg, .png"
                        multiple={false}
                        onDrop={onDrop}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            border: 'thin dashed black',
                            background: '#d3d3d3',
                            minWidth: '250px',
                            maxWidth: '800px',
                            minHeight: '120px',
                            padding: '16px 11px',
                            borderRadius: '5px',
                            margin: '40px 0',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}>
                            {loadedImg ? (
                                <img 
                                    style={{
                                        margin: '5px',
                                        width: '100px',
                                        height: '100px',
                                        border: 'thin solid rgba(64, 64, 64, 0.15)',
                                        borderRadius: '5px',
                                        objectFit: 'cover',
                                    }}
                                    src={loadedImg} 
                                    width="100" 
                                    alt="drop" 
                                />
                            ) : (
                                <h5>Drop some files on me!</h5>
                            )}
                        </div>
                    </MagicDropzone>
                    <div>
                        {loadedImg && (
                            <div style={{
                                marginLeft: '100px',
                                paddingLeft: '100px'
                            }}>
                                <img 
                                    style={{ position: 'absolute' }} 
                                    ref={imageRef} 
                                    src={loadedImg} 
                                    width="500" 
                                    alt="test"  
                                />
                                <canvas 
                                    style={{ position: 'absolute' }}
                                    ref={canvasRef} 
                                    width="700" 
                                    height="500" 
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Detection;