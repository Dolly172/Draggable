import React, { useState } from 'react';
import Draggable from './components/Draggable';
import './App.css';

const App = () => {
  const [components, setComponents] = useState([
    { component: <Draggable key={0} level="(child)" width={200} height={200}>Child</Draggable>, width: 200, height: 200 }
  ]);

  const addParent = () => {
    const lastComponent = components[components.length - 1];
    const newWidth = lastComponent.width + 200;
    const newHeight = lastComponent.height + 150;
    const newComponent = {
      component: (
        <Draggable key={components.length} level={`(after click ${components.length})`} width={newWidth} height={newHeight}>
          {lastComponent.component}
        </Draggable>
      ),
      width: newWidth,
      height: newHeight
    };
    setComponents([...components, newComponent]);
  };

  return (
    <div className="App">
      <button onClick={addParent}>AddParent</button>
      <div className="draggable-container">
        {components[components.length - 1].component}
      </div>
    </div>
  );
};

export default App;
