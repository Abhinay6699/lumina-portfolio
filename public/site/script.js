/* ============ Loading screen ============ */
(function loader() {
  const loader = document.getElementById('loader');
  const countEl = document.getElementById('loaderCount');
  const fillEl = document.getElementById('loaderBarFill');
  const wordEl = document.getElementById('loaderWord');
  const words = ['Architect', 'Train', 'Deploy'];
  let wordIdx = 0;

  const wordTimer = setInterval(() => {
    wordEl.classList.add('fade-out');
    setTimeout(() => {
      wordIdx = (wordIdx + 1) % words.length;
      wordEl.textContent = words[wordIdx];
      wordEl.classList.remove('fade-out');
    }, 200);
  }, 900);

  const start = performance.now();
  const duration = 2700;
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const v = Math.floor(p * 100);
    countEl.textContent = String(v).padStart(3, '0');
    fillEl.style.width = v + '%';
    if (p < 1) requestAnimationFrame(tick);
    else {
      clearInterval(wordTimer);
      setTimeout(() => loader.classList.add('is-hidden'), 400);
    }
  }
  requestAnimationFrame(tick);
})();

/* ============ Navbar scroll + active link ============ */
(function navbar() {
  const nav = document.querySelector('.nav');
  const links = document.querySelectorAll('.nav-link, .nav-logo[data-link]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
  });

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('is-active'));
      const label = link.dataset.link;
      const match = document.querySelector(`.nav-link[data-link="${label}"]`);
      if (match) match.classList.add('is-active');
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* ============ Hero role rotator ============ */
(function roleRotator() {
  const el = document.getElementById('role');
  if (!el) return;
  const roles = ['Builder', 'Researcher', 'Engineer', 'Student'];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % roles.length;
    el.classList.remove('fade');
    void el.offsetWidth; // restart animation
    el.textContent = roles[i];
    el.classList.add('fade');
  }, 2000);
})();

/* ============ Reveal on scroll (IntersectionObserver) ============ */
(function reveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '-50px' });
  els.forEach(el => io.observe(el));
})();

/* ============ Explorations parallax ============ */
(function parallax() {
  const section = document.querySelector('.explore');
  const left = document.getElementById('exploreLeft');
  const right = document.getElementById('exploreRight');
  if (!section || !left || !right) return;

  // Apply rotation to images
  document.querySelectorAll('.explore-img').forEach(img => {
    const rot = img.dataset.rot || 0;
    img.style.transform = `rotate(${rot}deg)`;
  });

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const passed = Math.min(Math.max(-rect.top, 0), total);
    const t = total > 0 ? passed / total : 0;
    left.style.transform = `translateY(${-200 * t}px)`;
    right.style.transform = `translateY(${-400 * t}px)`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ============ Lightbox ============ */
(function lightbox() {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = '<img alt="" />';
  document.body.appendChild(box);
  const img = box.querySelector('img');

  document.querySelectorAll('.explore-img img').forEach(thumb => {
    thumb.parentElement.addEventListener('click', () => {
      img.src = thumb.src;
      box.classList.add('is-open');
    });
  });
  box.addEventListener('click', () => box.classList.remove('is-open'));
})();

/* ============ Marquee build ============ */
(function marquee() {
  const track = document.getElementById('marquee');
  if (!track) return;
  // Build 20 spans, duplicated content gives the seamless -50% loop
  const html = Array.from({ length: 20 })
    .map(() => '<span>BUILDING THE FUTURE •</span>').join('');
  track.innerHTML = html;
})();
