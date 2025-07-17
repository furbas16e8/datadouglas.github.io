/**
 * particleground.js — Canvas sincronizado via atributos e posicionado por CSS
 */

document.addEventListener('DOMContentLoaded', function () {
  const hero = document.getElementById('hero-bg');
  if (!hero) return;

  // 1️⃣ Inicia o particleground
  particleground(hero, {
    dotColor: '#ffffff22',
    lineColor: '#ffffff33',
    density: 10000,
    proximity: 100,
    minSpeedX: 0.1,
    maxSpeedX: 0.7,
    minSpeedY: 0.1,
    maxSpeedY: 0.7
  });

  // 2️⃣ Função para ajustar dimensão do canvas via atributos
  function syncCanvasSize() {
    const canvas = hero.querySelector('canvas');
    if (canvas) {
      canvas.width  = hero.clientWidth;
      canvas.height = hero.clientHeight;
    }
  }

  // 3️⃣ Chama *já* para garantir que o canvas apareça corretamente
  syncCanvasSize();

  // 4️⃣ Ajusta só no redimensionar
  window.addEventListener('resize', syncCanvasSize);
});
