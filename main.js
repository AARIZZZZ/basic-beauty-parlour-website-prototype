
(function () {
  const lf = document.getElementById('lf');
  const lpct = document.getElementById('lpct');
  const ldr = document.getElementById('ldr');
  let p = 0;
  const t = setInterval(() => {
    p += Math.random() * 18 + 5;
    if (p >= 100) { p = 100; clearInterval(t); }
    lf.style.width = p + '%';
    lpct.textContent = Math.floor(p) + '%';
  }, 70);
  setTimeout(() => ldr.classList.add('hidden'), 2100);
})();

window.addEventListener('scroll', () => {
  const s = scrollY, max = document.documentElement.scrollHeight - innerHeight;
  document.getElementById('pb').style.width = (s / max * 100) + '%';
  document.getElementById('btt').classList.toggle('on', s > 500);
});
document.getElementById('btt').addEventListener('click', () =>
  window.scrollTo({ top: 0, behavior: 'smooth' })
);

const cdot = document.getElementById('cdot');
const crng = document.getElementById('crng');
const clbl = document.getElementById('clbl');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cdot.style.left = mx + 'px'; cdot.style.top = my + 'px';
  clbl.style.left = (mx + 28) + 'px'; clbl.style.top = (my - 8) + 'px';
});
(function aC() {
  rx += (mx - rx) * .1; ry += (my - ry) * .1;
  crng.style.left = rx + 'px'; crng.style.top = ry + 'px';
  requestAnimationFrame(aC);
})();
document.addEventListener('mousedown', () => crng.classList.add('clk'));
document.addEventListener('mouseup', () => crng.classList.remove('clk'));

document.querySelectorAll('[data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    crng.classList.add('hov');
    clbl.textContent = el.dataset.cursor;
    clbl.classList.add('show');
  });
  el.addEventListener('mouseleave', () => {
    crng.classList.remove('hov');
    clbl.classList.remove('show');
  });
});
document.querySelectorAll('a,button,.sc,.cc,.gi,.gtab,.af').forEach(el => {
  if (!el.dataset.cursor) {
    el.addEventListener('mouseenter', () => crng.classList.add('hov'));
    el.addEventListener('mouseleave', () => crng.classList.remove('hov'));
  }
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('sc', scrollY > 60));

function tMob() {
  const m = document.getElementById('mob');
  const h = document.getElementById('ham');
  const o = m.classList.toggle('open');
  h.classList.toggle('open', o);
  document.body.style.overflow = o ? 'hidden' : '';
}
function cMob() {
  document.getElementById('mob').classList.remove('open');
  document.getElementById('ham').classList.remove('open');
  document.body.style.overflow = '';
}

const hpar = document.getElementById('hpar');
window.addEventListener('scroll', () => {
  if (hpar) hpar.style.transform = `translateY(${scrollY * .22}px)`;
});

const cv = document.getElementById('pc');
if (cv) {
  const ctx = cv.getContext('2d');
  function rz() { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; }
  rz(); window.addEventListener('resize', rz);
  class P {
    constructor() { this.rs(); }
    rs() {
      this.x = Math.random() * cv.width;
      this.y = Math.random() * cv.height;
      this.sz = Math.random() * 1.8 + .4;
      this.vx = (Math.random() - .5) * .28;
      this.vy = -Math.random() * .5 - .15;
      this.l = 1;
      this.dc = Math.random() * .003 + .001;
    }
    tick() {
      this.x += this.vx; this.y += this.vy; this.l -= this.dc;
      if (this.l <= 0) this.rs();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196,168,130,${(Math.random() * .3 + .08).toFixed(2)})`;
      ctx.globalAlpha = this.l;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }
  const pts = Array.from({ length: 55 }, () => new P());
  (function loop() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    pts.forEach(p => { p.tick(); p.draw(); });
    requestAnimationFrame(loop);
  })();
}

const rObs = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); }),
  { threshold: .1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.rv,.rvl,.rvr,.rvs').forEach(el => rObs.observe(el));

function eoq(t) { return 1 - Math.pow(1 - t, 4); }
function animCounter(el) {
  const tg = +el.dataset.t, sf = el.dataset.s || '', dur = 1800, st = performance.now();
  (function step(now) {
    const p = Math.min((now - st) / dur, 1);
    el.textContent = Math.floor(eoq(p) * tg).toLocaleString('en-IN') + sf;
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}
const cObs = new IntersectionObserver(entries =>
  entries.forEach(e => {
    if (e.isIntersecting) { animCounter(e.target); cObs.unobserve(e.target); }
  }), { threshold: .6 }
);
document.querySelectorAll('.cu').forEach(el => cObs.observe(el));

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .25}px)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});

document.querySelectorAll('.sc').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.transform = `perspective(700px) rotateY(${((e.clientX - r.left) / r.width - .5) * 4}deg) rotateX(${-((e.clientY - r.top) / r.height - .5) * 4}deg) translateZ(4px)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

function tCourse(hd) {
  const card = hd.closest('.cc');
  const was = card.classList.contains('open');
  document.querySelectorAll('.cc.open').forEach(c => c.classList.remove('open'));
  if (!was) card.classList.add('open');
}

document.querySelectorAll('.gtab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.gtab').forEach(t => t.classList.remove('act'));
    tab.classList.add('act');
    const f = tab.dataset.f;
    document.querySelectorAll('.gi').forEach(item => {
      const m = f === 'all' || item.dataset.c === f;
      item.style.opacity = m ? '1' : '.1';
      item.style.transform = m ? '' : 'scale(.97)';
      item.style.pointerEvents = m ? '' : 'none';
      item.style.transition = 'opacity .4s,transform .4s';
    });
  });
});

const tt = document.getElementById('tt');
const tdots = document.querySelectorAll('.t-dt');
const tctr = document.getElementById('tctr');
let tc = 0;
const tTot = document.querySelectorAll('.t-sl').length;

function tGo(n) {
  tc = ((n % tTot) + tTot) % tTot;
  tt.style.transform = `translateX(-${tc * 100}%)`;
  tdots.forEach((d, i) => d.classList.toggle('on', i === tc));
  tctr.textContent = String(tc + 1).padStart(2, '0');
}
document.getElementById('tprev').addEventListener('click', () => tGo(tc - 1));
document.getElementById('tnext').addEventListener('click', () => tGo(tc + 1));
tdots.forEach((d, i) => d.addEventListener('click', () => tGo(i)));

let tsx = 0;
tt.addEventListener('touchstart', e => { tsx = e.touches[0].clientX; }, { passive: true });
tt.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tsx;
  if (Math.abs(dx) > 50) tGo(tc + (dx < 0 ? 1 : -1));
});

let ta = setInterval(() => tGo(tc + 1), 5500);
tt.addEventListener('mouseenter', () => clearInterval(ta));
tt.addEventListener('mouseleave', () => { ta = setInterval(() => tGo(tc + 1), 5500); });

document.getElementById('fsub').addEventListener('click', function () {
  const btn = this;
  btn.querySelector('.ft').style.display = 'none';
  btn.querySelector('.fs').style.display = 'inline';
  btn.disabled = true;
  setTimeout(() => {
    btn.querySelector('.fs').style.display = 'none';
    btn.querySelector('.ft').style.display = 'inline';
    btn.querySelector('.ft').textContent = 'Booking Sent ✓';
    btn.style.background = 'var(--warm)';
    btn.style.color = 'var(--dark)';
    btn.disabled = false;
    document.getElementById('fok').classList.add('show');
    setTimeout(() => {
      document.getElementById('fok').classList.remove('show');
      btn.querySelector('.ft').textContent = 'Confirm Appointment →';
      btn.style.background = '';
      btn.style.color = '';
    }, 5000);
  }, 2000);
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const el = document.querySelector(a.getAttribute('href'));
    if (el) {
      e.preventDefault();
      window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 75, behavior: 'smooth' });
    }
  });
});

const mqt = document.getElementById('mqt');
if (mqt) {
  mqt.addEventListener('mouseenter', () => mqt.style.animationPlayState = 'paused');
  mqt.addEventListener('mouseleave', () => mqt.style.animationPlayState = 'running');
}

const badge = document.querySelector('.h-badge');
if (badge) {
  document.addEventListener('mousemove', e => {
    badge.style.transform = `translate(${(e.clientX / innerWidth - .5) * 12}px,${(e.clientY / innerHeight - .5) * 10}px)`;
  });
}

const nls = document.querySelectorAll('.n-links a:not(.n-cta)');
document.querySelectorAll('section[id]').forEach(s =>
  new IntersectionObserver(entries =>
    entries.forEach(e => {
      if (e.isIntersecting) {
        nls.forEach(a => a.style.color = '');
        const m = document.querySelector(`.n-links a[href="#${e.target.id}"]`);
        if (m) m.style.color = 'var(--brown)';
      }
    }), { threshold: .45 }
  ).observe(s)
);