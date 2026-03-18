document.addEventListener('DOMContentLoaded', function () {

  if (typeof gsap === 'undefined') {
    console.error('GSAP not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ══════════════════════════════════════
  // NAVBAR
  // ══════════════════════════════════════
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('mobileDrawer');
  const navbar    = document.getElementById('navbar');

  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      const isOpen = drawer.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      drawer.setAttribute('aria-hidden', !isOpen);
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        drawer.setAttribute('aria-hidden', true);
      });
    });
  }

  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    });
  }






    // ══════════════════════════════════════
  // BANNER ENTRANCE ANIMATION
  // ══════════════════════════════════════
  const bannerContent = document.querySelector('.banner-content');
  const mobileDesign  = document.querySelector('.mobile-design');
 
  // Banner content আগে fade in
  if (bannerContent) {
    gsap.from(bannerContent, {
      opacity:  0,
      y:        40,
      duration: 1,
      ease:     'power3.out',
      delay:    0.2,
    });
  }
 
  if (mobileDesign) {
    gsap.from(mobileDesign, {
      opacity:  0,
      y:        80,
      scale:    0.96,
      duration: 1.2,
      ease:     'power4.out',
      delay:    0.5,   
    });
  }
 

  // ══════════════════════════════════════
  // LENIS
  // ══════════════════════════════════════
  if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      duration:        1.4,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel:     true,
      wheelMultiplier: 1.3,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // ══════════════════════════════════════
  // COUNTER
  // ══════════════════════════════════════
  const counterEls = document.querySelectorAll('[data-target]');

  counterEls.forEach(function (el) {
    const target   = parseFloat(el.dataset.target) || 0;
    const suffix   = el.dataset.suffix             ?? '';
    const decimals = parseInt(el.dataset.decimals) || 0;

    el.textContent = (0).toFixed(decimals) + suffix;

    const obj = { val: 0 };

    gsap.to(obj, {
      val:      target,
      duration: 2,
      ease:     'power2.out',
      scrollTrigger: {
        trigger:       '.motivation',
        start:         'top 75%',
        toggleActions: 'play none none none',
      },
      onUpdate: function () {
        el.textContent = obj.val.toFixed(decimals) + suffix;
      },
    });
  });

  // ══════════════════════════════════════
  // MARQUEE — Splide
  // ══════════════════════════════════════
  const marqueeEl = document.getElementById('streakr-marquee');

  if (marqueeEl && typeof Splide !== 'undefined') {
    const splide = new Splide('#streakr-marquee', {
      type       : 'loop',
      drag       : 'free',
      focus      : 'center',
      arrows     : false,
      pagination : false,
      autoWidth  : true,
      gap        : '48px',
      autoScroll : {
        speed        : 1,
        pauseOnHover : false,
        pauseOnFocus : false,
        rewind       : false,
      },
    });

    splide.mount(
      typeof SplideAutoScroll !== 'undefined'
        ? { AutoScroll: SplideAutoScroll }
        : {}
    );
  }

  // ══════════════════════════════════════
  // TEXT REVEAL —  h1, h2, h3
  // ══════════════════════════════════════
const headings = document.querySelectorAll(
  '.app-features-view h3, .feature h3, .feature h2, .motivation h2'
  // নতুন section যোগ করো: ', .banner h1'
);

  console.log('Text reveal headings found:', headings.length);

  headings.forEach(function (heading) {
    const words = heading.innerText.trim().split(/\s+/);

    heading.innerHTML = words.map(function (word) {
      return `<span class="reveal-word-outer"><span class="reveal-word-inner">${word}</span></span>`;
    }).join(' ');

    const innerSpans = heading.querySelectorAll('.reveal-word-inner');

    gsap.set(innerSpans, { yPercent: 110, opacity: 0 });

    gsap.to(innerSpans, {
      yPercent:  0,
      opacity:   1,
      duration:  0.7,
      ease:      'power3.out',
      stagger:   0.06,
      scrollTrigger: {
        trigger:       heading,
        start:         'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });

});