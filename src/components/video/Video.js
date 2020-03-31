import React, { useState, useRef, useContext } from 'react';
import { ModelContext } from '../context/model-context';
import MagicDropzone from 'react-magic-dropzone';
import { useDimension } from '../utils/dimension-hook';
import useBoxRenderer from './useBoxRenderer';

const Video = () => {
    const { model, labels } = useContext(ModelContext);
    const dimensions = useDimension();
    const [frame, setFrame] = useState();
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef();
    const canvasRef = useRef();

    useBoxRenderer(model, videoRef, canvasRef, videoLoaded, labels)

    const onDrop = (accepted, rejected, links) => {
        setVideoLoaded(false);
        if (accepted && accepted.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                videoRef.current.src = reader.result;
                setFrame(`${reader.result}#t=0.1`)
                videoRef.current.onloadeddata = () => {
                    setVideoLoaded(true);
                }
            });
            reader.readAsDataURL(accepted[0]);
        }
    }

    return (
        <React.Fragment>
            <div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <MagicDropzone
                        accept="video/mp4, video/x-m4v, video/*"
                        multiple={false}
                        onDrop={onDrop}
                        style={{
                            display: 'flex',
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
                        }}>
                            {frame ? (
                                <video 
                                    style={{
                                        margin: '5px',
                                        width: '100px',
                                        height: '100px',
                                        border: 'thin solid rgba(64, 64, 64, 0.15)',
                                        borderRadius: '5px',
                                        objectFit: 'cover',
                                    }}
                                    src={frame}
                                    width="100" 
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
                                    width={dimensions.width}
                                    height={dimensions.height} 
                                    style={{
                                        position:'absolute',
                                        top:'0px',
                                        left:'0px',
                                    }}   
                                    ref={videoRef} 
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
        </React.Fragment>
    )
}

export default Video;