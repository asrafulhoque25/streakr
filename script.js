 (function () {
    const hamburger = document.getElementById('hamburger');
    const drawer    = document.getElementById('mobileDrawer');
 
    hamburger.addEventListener('click', function () {
      const isOpen = drawer.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      drawer.setAttribute('aria-hidden', !isOpen);
    });
 
    // Close drawer on link click
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        drawer.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        drawer.setAttribute('aria-hidden', true);
      });
    });
 
    // Glass effect on scroll
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  })();


  //marquee

  document.addEventListener('DOMContentLoaded', function () {
      var splide = new Splide('#streakr-marquee', {
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

      splide.mount(window.SplideAutoScroll
        ? { AutoScroll: window.SplideAutoScroll }
        : window.splide
          ? window.splide.Extensions
          : {}
      );
    });


    //counter

    gsap.registerPlugin(ScrollTrigger);
 

const counterEls = document.querySelectorAll('[data-target]');
 
counterEls.forEach(function (el) {
  const target   = parseFloat(el.dataset.target)  || 0;
  const suffix   = el.dataset.suffix              ?? '';
  const decimals = parseInt(el.dataset.decimals)  || 0;
 
 
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
 

    
//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,     
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical', 
  gestureDirection: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.3, 
  infinite: false,
});


lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


