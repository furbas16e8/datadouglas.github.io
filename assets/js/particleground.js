// TODO: usar evento load para garantir que a lib e o container existam
window.addEventListener('load', function () {
  const hero = document.getElementById('hero-bg');
  if (!hero) return;
  particleground(hero, {
  dotColor:         '#ffffff80',
  lineColor:        '#ffffff50',
  density:          25000,
  proximity:        120,

  // velocidades suaves
  minSpeedX:        0.2,
  maxSpeedX:        0.8,
  minSpeedY:        0.2,
  maxSpeedY:        0.8,

  // raio base — a variação agora vem do layer
  particleRadius:   8,

  // linhas de conexão mais visíveis
  lineWidth:        2,
  curvedLines:      false,

  // parallax sutil
  parallax:         false,
  parallaxMultiplier: 40
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


