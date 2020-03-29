import React, { useState, useCallback } from 'react';
import { ModelContext } from './components/context/model-context';
import Detection from './components/Image/Detection';
import Realtime from './components/Realtime/Realtime';
import LoadingSpinner from './components/utils/LoadingSpinner';

const App = () => {
  const [model, setModel] = useState(null);
  const [labels, setLabels] = useState(null);

  const fetchModel = useCallback((model) => {
      setModel(model);
  }, []);

  const fetchLabels = useCallback((labels) => {
      setLabels(labels);
  }, []);

  return (
      <ModelContext.Provider 
        value={{
          model: model, 
          fetchModel: fetchModel, 
          labels: labels, 
          fetchLabels: fetchLabels
        }}>
        <Detection />
        {/* <LoadingSpinner /> */}
      </ModelContext.Provider>
  );
}

export default App;


