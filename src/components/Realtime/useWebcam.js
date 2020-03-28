import { useEffect, useState } from 'react'

const useWebcam = (model, videoRef) => {
  const [webcamLoaded, setWebcamLoaded] = useState(false)
  useEffect(() => {
    if (model) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              facingMode: 'environment'
            }
          })
          .then(stream => {
            // window.stream = stream
            videoRef.current.srcObject = stream
            videoRef.current.onloadedmetadata = () => {
              setWebcamLoaded(true)
            }
          })
      }
    }
  }, [model, videoRef])
  return webcamLoaded
}

export default useWebcam
