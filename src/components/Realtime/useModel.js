import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs';

const useModel = modelPath => {
  const [model, setModel] = useState();

   // eslint-disable-next-line
  const [labels, setLabels] = useState(["tiger", "giraffe"]);
  useEffect(() => {
    tf.loadGraphModel(modelPath + '/model.json').then(model => {
      console.log(model)
      setModel(model)
    })
  }, [modelPath])
  return [model, labels]
}

export default useModel 
