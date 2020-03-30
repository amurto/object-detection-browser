import React, { useState } from 'react';

const Selector = () => {
    const [selected, setSelected] = useState('');


    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{ width: '33%', padding: '20px' }}>
                {selected === 'Image' ? (
                    <div 
                        onClick={() => setSelected('Image')} 
                        style={{ 
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            textAlign: 'center', 
                            backgroundColor: '#ebc2ff', 
                            borderRadius: '8px',
                            borderColor: '#8016b5',
                            borderStyle: 'solid',
                            borderWidth: '2px', 
                        }}>
                            <div style={{
                                fontWeight: '500',
                                color: '#8016b5'
                            }}>Image</div>
                    </div>
                ) : (
                    <div 
                        onClick={() => setSelected('Image')} 
                        style={{ 
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            textAlign: 'center', 
                            backgroundColor: '#6e00b8', 
                            borderRadius: '8px' 
                        }}> 
                            <div style={{
                                fontWeight: '400',
                                color: 'white'
                            }}>Image</div>
                    </div>
                )}
            </div>
            
            <div style={{ width: '33%', padding: '20px' }}>
                {selected === 'Video' ? (
                        <div 
                            onClick={() => setSelected('Video')} 
                            style={{ 
                                paddingTop: '20px',
                                paddingBottom: '20px',
                                textAlign: 'center', 
                                backgroundColor: '#ebc2ff', 
                                borderRadius: '8px',
                                borderColor: '#8016b5',
                                borderStyle: 'solid',
                                borderWidth: '2px', 
                            }}>
                                <div style={{
                                    fontWeight: '500',
                                    color: '#8016b5'
                                }}>Video</div>
                        </div>
                    ) : (
                        <div 
                            onClick={() => setSelected('Video')} 
                            style={{ 
                                paddingTop: '20px',
                                paddingBottom: '20px',
                                textAlign: 'center', 
                                backgroundColor: '#6e00b8', 
                                borderRadius: '8px' 
                            }}> 
                                <div style={{
                                    fontWeight: '400',
                                    color: 'white'
                                }}>Video</div>
                        </div>
                    )}
            </div>

            <div style={{ width: '33%', padding: '20px' }}>
                {selected === 'Realtime' ? (
                    <div 
                        onClick={() => setSelected('Realtime')} 
                        style={{ 
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            textAlign: 'center', 
                            backgroundColor: '#ebc2ff', 
                            borderRadius: '8px',
                            borderColor: '#8016b5',
                            borderStyle: 'solid',
                            borderWidth: '2px', 
                        }}>
                            <div style={{
                                fontWeight: '500',
                                color: '#8016b5'
                            }}>Realtime</div>
                    </div>
                ) : (
                    <div 
                        onClick={() => setSelected('Realtime')} 
                        style={{ 
                            paddingTop: '20px',
                            paddingBottom: '20px',
                            textAlign: 'center', 
                            backgroundColor: '#6e00b8', 
                            borderRadius: '8px' 
                        }}> 
                            <div style={{
                                fontWeight: '400',
                                color: 'white'
                            }}>Realtime</div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default Selector;