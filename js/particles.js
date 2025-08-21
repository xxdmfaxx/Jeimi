const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let particles = [];
let hue = 0;
let mouse = { x: null, y: null, active: false };

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  // pequeñas chispas al mover
  for (let i = 0; i < 4; i++) particles.push(new Particle(mouse.x, mouse.y, true));
});
window.addEventListener('mouseleave', () => mouse.active = false);

class Particle {
  constructor(x, y, burst = false) {
    this.x = x ?? Math.random() * canvas.width;
    this.y = y ?? Math.random() * canvas.height;
    this.size = burst ? Math.random() * 2 + 1 : Math.random() * 3 + 1.2;
    const speed = burst ? 1.4 : 0.6;
    this.vx = (Math.random() - 0.5) * speed;
    this.vy = (Math.random() - 0.5) * speed;
    this.life = burst ? 80 : 220;
    this.maxLife = this.life;
    this.h = (hue + Math.random() * 20) % 360;
    this.s = 100;
    this.l = burst ? 70 : 75;
  }
  update() {
    // leve atracción/repulsión con el mouse
    if (mouse.active) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      const influence = Math.max(0, 120 - dist) / 120;
      this.vx += (dx / (dist || 1)) * 0.03 * influence;
      this.vy += (dy / (dist || 1)) * 0.03 * influence;
    }
    this.x += this.vx;
    this.y += this.vy;

    // rebote suave en bordes
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    this.life--;
  }
  draw() {
    ctx.fillStyle = `hsla(${this.h}, ${this.s}%, ${this.l}%, ${Math.max(0, this.life / this.maxLife)})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initBaseParticles(count = 70) {
  particles = [];
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function connectLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        const alpha = 1 - dist / 120;
        ctx.strokeStyle = `hsla(${(particles[i].h + particles[j].h) / 2}, 90%, 80%, ${alpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hue += 0.25;

  // actualizar & dibujar
  particles = particles.filter(p => p.life > 0);
  for (const p of particles) { p.update(); p.draw(); }

  // líneas sutiles que conectan cercanos
  connectLines();

  // mantener un mínimo de partículas base
  if (particles.length < 70) particles.push(new Particle());

  requestAnimationFrame(animate);
}

initBaseParticles();
animate();
