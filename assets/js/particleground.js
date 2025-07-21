// TODO: usar evento load para garantir que a lib e o container existam
window.addEventListener('load', function () {
  const hero = document.getElementById('hero-bg');
  if (!hero) return;
  particleground(hero, { /* opções */ });

  particleground(hero, {
  dotColor:    '#ffffff22',
  lineColor:   '#ffffff33',
  density:     2000,    // menos partículas por pixel => mais leve
  proximity:   200,     // conecta a maior distância
  minSpeedX:   0.5,     // mais rápido
  maxSpeedX:   1.0,
  minSpeedY:   0.5,
  maxSpeedY:   1.0,
  particleRadius: 3,    // círculos menores
  lineWidth:   1.0,
  curvedLines: true,    // trajetórias curvas
  parallax:    true,
  parallaxMultiplier: 10
  });


  function sync() {
    const canvas = hero.querySelector('canvas');
    if (!canvas) return;
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
  }

  sync();
  window.addEventListener('resize', sync);
});
