import { createRoot } from 'react-dom/client';

import { App } from './App';

import '../index.css';

console.log('👋 This message is being logged by "renderer.js", included via webpack');

window.onload = () => {
  const container = document.querySelector('.root');
  const root = createRoot(container);
  root.render(
    <App></App>
  );
}
