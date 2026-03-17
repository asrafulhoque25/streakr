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