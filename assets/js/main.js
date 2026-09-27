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
