

document.querySelector('.get-news').addEventListener('click', async () => {
  try {
    // Send a request to the backend to start Puppeteer and OpenAI tasks
    const response = await fetch('/api/get-news');
    const result = await response.json();
    
    // Display the result on the page
    document.getElementById('news-section fade-in').textContent = `AI Response: ${result.data}`;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

  // Function to detect when elements are in view
  function onScroll() {
    const fadeInElements = document.querySelectorAll('.fade-in');
    const navbar = document.querySelector('navbar');
  
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

 




  