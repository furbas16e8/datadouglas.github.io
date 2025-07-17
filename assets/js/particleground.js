// TODO: usar evento load para garantir que a lib e o container existam
window.addEventListener('load', function () {
  const hero = document.getElementById('hero-bg');
  if (!hero) return;
  particleground(hero, { /* opções */ });

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

  function sync() {
    const canvas = hero.querySelector('canvas');
    if (!canvas) return;
    canvas.width = hero.clientWidth;
    canvas.height = hero.clientHeight;
  }

  sync();
  window.addEventListener('resize', sync);
});
