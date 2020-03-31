import { useState, useEffect } from 'react';

export const useDimension = () => {
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

    return dimensions;
}