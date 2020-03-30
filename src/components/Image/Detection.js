import React, {  useState, useEffect, useRef, useContext } from 'react';
import { ModelContext } from '../context/model-context';
import useDetector from './useDetector';
import MagicDropzone from 'react-magic-dropzone';

const Detection = () => {
    const { model, labels } = useContext(ModelContext);
    const [loadedImg, setLoadedImg] = useState(null); 
    const imageRef = useRef();
    const canvasRef = useRef();

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

    useDetector(model, labels, loadedImg, imageRef, canvasRef)

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
        <React.Fragment>
                <div>
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
                                minWidth: '70%',
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
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {loadedImg && (
                            <div style={{
                                width: `${dimensions.width}px`,
                                height: `${dimensions.height}px`,
                            }}>
                                <div style={{
                                    width:'100%',
                                    height:'100%',
                                    position:'relative',
                                }}>
                                    <img 
                                        src={loadedImg} 
                                        width={dimensions.width}
                                        height={dimensions.height} 
                                        style={{
                                            position:'absolute',
                                            top:'0px',
                                            left:'0px',
                                        }}
                                        ref={imageRef} 
                                        alt="ok" 
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
                        )}
                    </div>
                    <h1>sfsd</h1>
                </div>
        </React.Fragment>
    )
}

export default Detection;