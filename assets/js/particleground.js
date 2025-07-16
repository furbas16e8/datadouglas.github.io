document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('hero-bg'), {
    dotColor: '#ffffff22',
    lineColor: '#ffffff33',
    density: 10000,
    proximity: 100,
    minSpeedX: 0.1,
    maxSpeedX: 0.7,
    minSpeedY: 0.1,
    maxSpeedY: 0.7
  });
}, false);
