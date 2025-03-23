import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private cube: THREE.Mesh;
  private clock: THREE.Clock;
  private frameId: number | null = null;

  constructor(container: HTMLElement) {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111111);

    // Initialize camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    // Initialize controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    this.scene.add(directionalLight);

    // Add cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      metalness: 0.3,
      roughness: 0.4,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // Initialize clock
    this.clock = new THREE.Clock();

    // Add event listeners
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private handleResize(): void {
    // Update camera
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private animate(): void {
    // Call animate recursively
    this.frameId = requestAnimationFrame(this.animate.bind(this));

    // Get delta time
    const elapsedTime = this.clock.getElapsedTime();

    // Update cube rotation
    this.cube.rotation.x = elapsedTime * 0.5;
    this.cube.rotation.y = elapsedTime * 0.3;

    // Update controls
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  public start(): void {
    if (this.frameId === null) {
      this.animate();
    }
  }

  public stop(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  public dispose(): void {
    this.stop();
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.renderer.dispose();

    // Dispose geometry and material
    this.cube.geometry.dispose();
    if (this.cube.material instanceof THREE.Material) {
      this.cube.material.dispose();
    } else {
      // Handle array of materials
      this.cube.material.forEach((material) => material.dispose());
    }
  }
}