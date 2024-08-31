// Smooth scrolling to the About section
function scrollToInfo() {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Function to detect when elements are in view
  function onScroll() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    const navbar = document.querySelector('.navbar');
  
    fadeInElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
  
      if (isVisible) {
        element.classList.add('in-view');
      } else {
        element.classList.remove('in-view');
      }
    });
  
    // Change navbar background color on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Listen for scroll events
  window.addEventListener('scroll', onScroll);
  
  // Initial check
  onScroll();
  