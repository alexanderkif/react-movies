import React from 'react';
import './styles.scss';

console.log('process', process.env.KEY, process.env.PORT);

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <h1>React 17 and TypeScript 4 App!🚀</h1>
    </div>
  );
};

export default App;
