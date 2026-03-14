/**
 * three-scene.js
 * Renders a slow-rotating luxury 3D object in the background using Three.js
 */

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#bg3D");
    if (!canvas || typeof THREE === 'undefined') return;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Add subtle ambient fog to blend the object into the dark background
    scene.fog = new THREE.Fog('#0f0f0f', 5, 15);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    // Position camera slightly offset
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Create Luxury 3D Object (Torus Knot)
    const geometry = new THREE.TorusKnotGeometry(2, 0.5, 128, 32);
    
    // Golden glossy material
    const material = new THREE.MeshStandardMaterial({
        color: 0xc9a96e,      // Primary gold
        metalness: 0.8,       // Highly metallic
        roughness: 0.2,       // Fairly smooth/glossy
        wireframe: false,
    });

    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // 3. Lighting setup for dramatic cinematic feel
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xfff6e5, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xc9a96e, 0.8);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // 4. Parallax effect based on mouse/scroll
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    window.addEventListener("mousemove", (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = -(event.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener("scroll", () => {
        scrollY = window.scrollY;
    });

    // Handle Window Resize
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // 5. Animation Loop
    const clock = new THREE.Clock();

    const tick = () => {
        const elapsedTime = clock.getElapsedTime();

        // Slow cinematic rotation
        torusKnot.rotation.y = elapsedTime * 0.1;
        torusKnot.rotation.x = elapsedTime * 0.15;

        // Gentle floating using Sine wave
        torusKnot.position.y = Math.sin(elapsedTime * 0.5) * 0.3;

        // Parallax easing - mouse movement
        torusKnot.position.x += (mouseX * 0.5 - torusKnot.position.x) * 0.05;
        torusKnot.position.y += (mouseY * 0.5 - torusKnot.position.y) * 0.05;

        // Move the object based on scrolling (pushes it back into the fog)
        const scrollOffset = scrollY * 0.001;
        
        // Render
        renderer.render(scene, camera);

        // Call tick again on the next frame
        window.requestAnimationFrame(tick);
    };

    tick();
});
