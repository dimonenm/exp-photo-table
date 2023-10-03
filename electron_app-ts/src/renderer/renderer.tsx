import { createRoot } from 'react-dom/client';
import { App } from './App';

window.onload = () => {
  const container = document.querySelector('.root');
  const root = createRoot(container);
  root.render(
    <App></App>
  );
}
