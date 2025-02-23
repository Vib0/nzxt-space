import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const containerRef = ref(null);
    let renderer, scene, camera, stars, animationFrameId;

    onMounted(() => {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.value.appendChild(renderer.domElement);

      const starCount = 300;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50; // X-axis
        positions[i + 1] = (Math.random() - 0.5) * 50; // Y-axis
        positions[i + 2] = Math.random() * -50;    // Z-axis (depth)
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.2,
        transparent: true,
        opacity: 0.8
      });

      stars = new THREE.Points(geometry, material);
      scene.add(stars);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const posArray = stars.geometry.attributes.position.array;
        for (let i = 0; i < posArray.length; i += 3) {
          posArray[i] -= 0.1;
          if (posArray[i] < -25) posArray[i] = 25;
        }

        stars.geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };

      animate();

      onBeforeUnmount(() => {
        cancelAnimationFrame(animationFrameId);
        renderer.dispose();
      });
    });

    return {
      containerRef
    };
  },

  template: `
    <div ref="containerRef" class="">
    </div>
  `
}

