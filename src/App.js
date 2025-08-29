import React, { useState } from 'react';
import './App.css';
import FileUpload from './components/FileUpload';
import Results from './components/Results';

function App() {
  const [results, setResults] = useState(null);

  const handleProcess = (data) => {
    setResults(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔗 Instagram Connection Analyzer</h1>
<<<<<<< HEAD
        <p>Upload your Instagram followers and following HTML files to analyze your connections!</p>
=======
        <p>Upload your Instagram followers and following HTML files to analyze your connections.</p>
>>>>>>> main
      </header>
      <main>
        <FileUpload onProcess={handleProcess} />
        {results && <Results data={results} />}
      </main>
    </div>
  );
}

export default App;
