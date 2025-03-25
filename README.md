# Three.js + TypeScript + Vite Project

This is a starter project using Three.js, TypeScript, and Vite, providing a modern development environment for 3D web applications.

## Features

- ⚡️ **Vite** - Super fast, next-generation frontend tooling 
- 🔥 **Three.js** - JavaScript 3D library to create and display animated 3D graphics
- 📝 **TypeScript** - Type safety for your 3D applications
- 🚀 **Hot Module Replacement** - See changes instantly
- 📱 **Responsive design** - Works on all devices
- 🔄 **Orbit controls** - Interactive camera controls

## Demo

The current demo features a rotating 3D cube with the following features:
- Metallic green material
- Orbit controls for interactive viewing
- Responsive design
- Performance optimizations
- Added person 3D model

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/acsobony/vite-threejs-typescript.git
cd vite-threejs-typescript
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
vite-threejs-typescript/
├── public/              # Static files
├── src/
│   ├── main.ts          # Entry point
│   ├── style.css        # Global styles
│   ├── types/           # Type definitions
│   └── utils/
│       └── SceneManager.ts # Three.js scene management
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Customization

### Adding New 3D Objects

To add new 3D objects, modify the `SceneManager.ts` file. For example, to add a sphere:

```typescript
// Inside the constructor of SceneManager
const sphereGeometry = new THREE.SphereGeometry(0.7, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  metalness: 0.3,
  roughness: 0.4,
});
this.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
this.sphere.position.x = 2;
this.scene.add(this.sphere);
```

## License

MIT
