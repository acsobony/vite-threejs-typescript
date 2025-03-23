import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true
  },
  build: {
    target: 'esnext',
    sourcemap: true
  },
  assetsInclude: ['**/*.gltf', '**/*.glb'] // Include any 3D model formats you might use
});