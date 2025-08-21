const numParticles = 50;

for(let i=0; i<numParticles; i++){
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.width = 5 + Math.random() * 15 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = 5 + Math.random() * 5 + 's';
    particle.style.backgroundColor = `rgba(255, ${100 + Math.random()*155}, ${150 + Math.random()*105}, 0.7)`;
    document.body.appendChild(particle);
}
