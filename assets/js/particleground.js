// TODO: usar evento load para garantir que a lib e o container existam
window.addEventListener('load', function () {
  const hero = document.getElementById('hero-bg');
  if (!hero) return;
  particleground(hero, {
  dotColor:    '#ffffff50',
  lineColor:   '#ffffff33',
  density:     20000,    // menos partículas por pixel => mais leve
  proximity:   100,     // conecta a maior distância
  minSpeedX:   0.3,     // mais rápido
  maxSpeedX:   0.8,
  minSpeedY:   0.3,
  maxSpeedY:   0.8,
  particleRadius: 8,    // círculos menores
  lineWidth:   1.5,
  curvedLines: false,    // trajetórias curvas
  parallax:    true,
  parallaxMultiplier: 50
  });
  
  particleground(hero, {});


  function sync() {
    const canvas = hero.querySelector('canvas');
    if (!canvas) return;
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
  }

  sync();
  window.addEventListener('resize', sync);
});
