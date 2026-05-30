/* ════════════════════════════════════════
   main.js — Profile Card Scripts
   ════════════════════════════════════════ */

// ── Theme: detect device preference before paint ──
// (also inlined in <head> as a blocking snippet to prevent flash)
(function () {
  const saved  = localStorage.getItem('theme');
  const prefer = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', saved || prefer);
})();

// ── Theme toggle button ──
document.addEventListener('DOMContentLoaded', () => {

  const btn = document.getElementById('themeBtn');
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // Sync with OS preference change during session (only if user hasn't overridden manually)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });

  // ── Floating particles ──
  const container = document.getElementById('particles');
  const colors    = ['#8B6F5E', '#7D9B76', '#D4A5A0', '#8BAEC4', '#C4805A'];

  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = [
      `left:${Math.random() * 100}%`,
      `top:${40 + Math.random() * 55}%`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `width:${3 + Math.random() * 5}px`,
      `height:${3 + Math.random() * 5}px`,
      `--dur:${6 + Math.random() * 10}s`,
      `--del:${-Math.random() * 10}s`,
    ].join(';');
    container.appendChild(p);
  }

  // ── 3D tilt effect on contact cards ──
  document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

});