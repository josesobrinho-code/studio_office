(() => {
  const carousel = document.querySelector('[data-reviews-carousel]');
  if (!carousel) return;
  const track = carousel.querySelector('.reviews-track');
  const slides = [...track.children];
  const dots = [...document.querySelectorAll('.reviews-dots button')];
  let current = 0;
  let timer;

  function show(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === current));
  }
  function start() { timer = window.setInterval(() => show(current + 1), 6500); }
  function reset() { window.clearInterval(timer); start(); }

  carousel.querySelector('.previous').addEventListener('click', () => { show(current - 1); reset(); });
  carousel.querySelector('.next').addEventListener('click', () => { show(current + 1); reset(); });
  dots.forEach((dot, index) => dot.addEventListener('click', () => { show(index); reset(); }));
  carousel.addEventListener('mouseenter', () => window.clearInterval(timer));
  carousel.addEventListener('mouseleave', start);
  show(0);
  start();
})();
