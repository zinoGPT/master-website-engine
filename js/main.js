(function () {
  'use strict';

  var header = document.querySelector('.header');

  /* -----------------------------------------
     Mobile Menu Toggle
     ----------------------------------------- */
  var toggle = document.querySelector('.header__toggle');
  var overlay = document.querySelector('.mobile-overlay');
  var overlayClose = document.querySelector('.mobile-overlay__close');
  var overlayLinks = overlay.querySelectorAll('a');

  function openMenu() {
    overlay.classList.add('open');
    toggle.classList.add('active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    if (overlay.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlayClose.addEventListener('click', closeMenu);

  overlayLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMenu();
    }
  });

  /* -----------------------------------------
     Header scroll effect
     ----------------------------------------- */
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* -----------------------------------------
     FAQ Accordion
     ----------------------------------------- */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-item__question');
    question.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = item.hasAttribute('open');
      faqItems.forEach(function (el) { el.removeAttribute('open'); });
      if (!isOpen) item.setAttribute('open', '');
    });
  });

  /* -----------------------------------------
     Scroll-triggered fade-in animations
     ----------------------------------------- */
  var fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var parent = el.parentNode;
            var siblings = Array.prototype.filter.call(parent.children, function (c) { return c.classList.contains('fade-in'); });
            var idx = siblings.indexOf(el);
            var delay = Math.min(idx * 0.08, 0.4);

            el.style.transitionDelay = delay + 's';
            el.classList.add('visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* -----------------------------------------
     Smooth scroll for anchor links
     ----------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

})();




