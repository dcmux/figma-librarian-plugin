import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

console.log('main.tsx is executing...');

// Add visible debugging to the page
const addDebugMessage = (message: string) => {
  console.log(message);
  const debugDiv = document.createElement('div');
  debugDiv.style.cssText = 'position:fixed;top:0;left:0;background:yellow;color:black;padding:5px;font-size:12px;z-index:9999;';
  debugDiv.textContent = message;
  document.body.appendChild(debugDiv);
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (debugDiv.parentNode) {
      debugDiv.parentNode.removeChild(debugDiv);
    }
  }, 3000);
};

addDebugMessage('main.tsx executing...');

const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  addDebugMessage('ERROR: Root element not found!');
  console.error('Root element not found!');
  throw new Error('Failed to find the root element');
}

addDebugMessage('Root element found, rendering React app...');

console.log('Rendering App...');
addDebugMessage('Rendering React app...');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

console.log('React render complete!');
addDebugMessage('React render complete!');
