// Finsavvys — small site behaviours (no dependencies)
(function () {
  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Header border once scrolled
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact: pre-select interest from ?interest= and show thank-you state
  var params = new URLSearchParams(window.location.search);
  var interest = params.get('interest');
  if (interest) {
    var box = document.querySelector('input[name="interest"][value="' + interest + '"]');
    if (box) box.checked = true;
  }
  if (params.get('sent') === '1') {
    var ok = document.getElementById('form-success');
    var form = document.getElementById('contact-form');
    if (ok && form) { ok.hidden = false; form.hidden = true; }
  }
})();

// Compounding calculator (illustrative only)
(function () {
  var root = document.getElementById('calc');
  if (!root) return;
  var m = root.querySelector('#c-monthly'), y = root.querySelector('#c-years'), r = root.querySelector('#c-rate');
  var fmt = function (n) { return '$' + Math.round(n).toLocaleString('en-US'); };
  var fv = function (pmt, years, rate) {
    var i = rate / 100 / 12, n = years * 12;
    return i === 0 ? pmt * n : pmt * ((Math.pow(1 + i, n) - 1) / i);
  };
  var fill = function (el) { el.style.setProperty('--p', ((el.value - el.min) / (el.max - el.min) * 100) + '%'); };
  function update() {
    var pmt = +m.value, years = +y.value, rate = +r.value;
    [m, y, r].forEach(fill);
    root.querySelector('#o-monthly').textContent = fmt(pmt);
    root.querySelector('#o-years').textContent = years + ' yrs';
    root.querySelector('#o-rate').textContent = rate + '%';
    var total = fv(pmt, years, rate), contrib = pmt * years * 12, growth = Math.max(total - contrib, 0);
    var early = fv(pmt, years + 10, rate);
    root.querySelector('#o-total').textContent = fmt(total);
    root.querySelector('#o-contrib').textContent = fmt(contrib);
    root.querySelector('#o-growth').textContent = fmt(growth);
    root.querySelector('#o-early').textContent = fmt(early - total);
    var max = Math.max(total, 1);
    root.querySelector('#b-contrib').style.width = (contrib / max * 100) + '%';
    root.querySelector('#b-total').style.width = '100%';
  }
  [m, y, r].forEach(function (el) { el.addEventListener('input', update); });
  update();
})();

// Count-up numbers
(function () {
  var els = document.querySelectorAll('[data-count]');
  if (!els.length || !('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, end = +el.getAttribute('data-count'), suf = el.getAttribute('data-suffix') || '', t0 = null;
      var step = function (t) { if (!t0) t0 = t; var p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step); io.unobserve(el);
    });
  }, { threshold: .5 });
  els.forEach(function (el) { io.observe(el); });
})();
