// ==========================
// Тема: Темна / Світла
// ==========================
const themeToggleBtn = document.getElementById('themeToggle');
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
});

// ==========================
// Зоряне небо
// ==========================
const starfield = document.getElementById('starfield');

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  star.style.position = 'absolute';
  star.style.backgroundColor = '#00ffea';
  star.style.borderRadius = '50%';
  star.style.opacity = Math.random() * 0.8 + 0.2;
  star.style.width = star.style.height = `${Math.random() * 2 + 1}px`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.boxShadow = `0 0 6px #00ffea`;

  return star;
}

for (let i = 0; i < 150; i++) {
  const star = createStar();
  starfield.appendChild(star);
}

// ==========================
// 3D Планета (three.js)
// ==========================
const container = document.getElementById('planet3d');

if (container) {
  const width = container.clientWidth || 250;
  const height = container.clientHeight || 250;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 4;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0x00ffea, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x00ffea, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const geometry = new THREE.SphereGeometry(1, 64, 64);
  const textureLoader = new THREE.TextureLoader();
  const planetTexture = textureLoader.load('https://threejs.org/examples/textures/earth_atmos_2048.jpg');
  const material = new THREE.MeshStandardMaterial({
    map: planetTexture,
    roughness: 0.7,
    metalness: 0.0,
  });
  const planet = new THREE.Mesh(geometry, material);
  scene.add(planet);

  function animate() {
    requestAnimationFrame(animate);
    planet.rotation.y += 0.002;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth || 250;
    const newHeight = container.clientHeight || 250;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
  });
}

// ==========================
// Слайдер на другій сторінці
// ==========================
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
      slide.setAttribute('aria-hidden', 'false');
    } else {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

if (prevBtn && nextBtn && slides.length > 0) {
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  showSlide(currentSlide);
}

// ==========================
// Простий чат-бот (демо)
// ==========================
const chatOutput = document.getElementById('chatOutput');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

if (chatOutput && chatInput && sendBtn) {
  sendBtn.addEventListener('click', () => {
    const userMsg = chatInput.value.trim();
    if (userMsg === '') return;

    addMessage(`Ви: ${userMsg}`);
    chatInput.value = '';

    setTimeout(() => {
      const botReply = generateBotReply(userMsg);
      addMessage(`Galaxy AI: ${botReply}`);
    }, 1000);
  });

  function addMessage(msg) {
    chatOutput.textContent += msg + '\n';
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }

  function generateBotReply(input) {
    // Проста логіка відповіді
    if (input.toLowerCase().includes('привіт')) {
      return 'Привіт! Як я можу допомогти?';
    }
    if (input.toLowerCase().includes('що ти робиш')) {
      return 'Я допомагаю вам досліджувати Galaxy AI!';
    }
    return 'Цікаво! Продовжуйте, будь ласка.';
  }
}
