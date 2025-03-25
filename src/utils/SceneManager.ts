import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private clock: THREE.Clock;
  private frameId: number | null = null;
  private person: THREE.Group;

  constructor(container: HTMLElement) {
    // Initialize scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x111111);

    // Initialize camera with adjusted position
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 5);
    this.camera.lookAt(0, 1, 0);

    // Initialize renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    // Initialize controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.target.set(0, 1, 0);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    this.scene.add(directionalLight);

    // Create person
    this.person = this.createPerson();
    this.scene.add(this.person);

    // Initialize clock
    this.clock = new THREE.Clock();

    // Add event listeners
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private createPerson(): THREE.Group {
    const person = new THREE.Group();

    // Material for the person
    const material = new THREE.MeshStandardMaterial({
      color: 0x3498db,
      metalness: 0.2,
      roughness: 0.8,
    });

    // Head
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 32, 32),
      material
    );
    head.position.y = 1.7;
    person.add(head);

    // Body
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.3, 0.8, 32),
      material
    );
    body.position.y = 1.15;
    person.add(body);

    // Arms
    const leftArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.7, 16),
      material
    );
    leftArm.position.set(-0.4, 1.15, 0);
    leftArm.rotation.z = -Math.PI / 6;
    person.add(leftArm);

    const rightArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.7, 16),
      material
    );
    rightArm.position.set(0.4, 1.15, 0);
    rightArm.rotation.z = Math.PI / 6;
    person.add(rightArm);

    // Legs
    const leftLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.1, 0.8, 16),
      material
    );
    leftLeg.position.set(-0.2, 0.4, 0);
    person.add(leftLeg);

    const rightLeg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.1, 0.8, 16),
      material
    );
    rightLeg.position.set(0.2, 0.4, 0);
    person.add(rightLeg);

    return person;
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
    this.frameId = requestAnimationFrame(this.animate.bind(this));

    // Get elapsed time
    const elapsedTime = this.clock.getElapsedTime();

    // Rotate person
    this.person.rotation.y = elapsedTime * 0.5;

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

    // Clean up all geometries and materials
    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (object.material instanceof THREE.Material) {
          object.material.dispose();
        } else {
          // Handle array of materials
          object.material.forEach((material: THREE.Material) => material.dispose());
        }
      }
    });
  }
}