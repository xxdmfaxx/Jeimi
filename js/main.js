// Animación de burbujas aleatorias
const bubbles = document.querySelectorAll('.bubble');

bubbles.forEach(bubble => {
  const randomX = Math.random() * window.innerWidth;
  const randomDelay = Math.random() * 5;
  const randomDuration = 5 + Math.random() * 5;

  bubble.style.left = randomX + 'px';
  bubble.style.animationDelay = randomDelay + 's';
  bubble.style.animationDuration = randomDuration + 's';
});
