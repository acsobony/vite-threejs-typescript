import './style.css';
import { SceneManager } from './utils/SceneManager';

// DOM elements
const appContainer = document.querySelector<HTMLDivElement>('#app');

// Create app container if it doesn't exist
if (!appContainer) {
  const newAppContainer = document.createElement('div');
  newAppContainer.id = 'app';
  document.body.appendChild(newAppContainer);
  initScene(newAppContainer);
} else {
  initScene(appContainer);
}

function initScene(container: HTMLElement): void {
  // Create info panel
  const infoPanel = document.createElement('div');
  infoPanel.className = 'info';
  infoPanel.innerHTML = `
    <h1>Three.js + TypeScript</h1>
    <p>Rotating cube with orbit controls</p>
    <p>Click and drag to rotate the camera</p>
    <p>Scroll to zoom in/out</p>
  `;
  container.appendChild(infoPanel);

  // Create scene
  const sceneManager = new SceneManager(container);
  sceneManager.start();

  // Cleanup on window unload
  window.addEventListener('beforeunload', () => {
    sceneManager.dispose();
  });
}