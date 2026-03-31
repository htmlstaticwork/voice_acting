document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Theme Management
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check for saved theme or system preference
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  if (currentTheme === 'dark') {
    htmlElement.classList.add('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      htmlElement.classList.toggle('dark');
      const isDark = htmlElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // RTL Management
  const rtlToggle = document.getElementById('rtl-toggle');
  if (rtlToggle) {
    rtlToggle.addEventListener('click', () => {
      const currentDir = htmlElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      htmlElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
    });
  }

  // Apply saved direction
  const savedDir = localStorage.getItem('dir');
  if (savedDir) {
    htmlElement.setAttribute('dir', savedDir);
  }

  // Mobile Menu Toggle (Slide-in)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileCloseBtn = document.getElementById('mobile-menu-close');
  const body = document.body;

  // Create overlay if it doesn't exist (though we'll add it to HTML for consistency)
  let overlay = document.querySelector('.mobile-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    body.appendChild(overlay);
  }

  function toggleMenu() {
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', toggleMenu);
  }
  
  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', toggleMenu);
  }

  if (overlay) {
    overlay.addEventListener('click', toggleMenu);
  }


  // Scroll Animations using Intersection Observer
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // =============================================
  // BACK TO TOP BUTTON LOGIC
  // =============================================
  
  const createBackToTop = () => {
    // Check if it already exists to avoid duplicates
    if (document.getElementById('back-to-top')) return;

    const btn = document.createElement('div');
    btn.id = 'back-to-top';
    btn.setAttribute('role', 'button');
    btn.setAttribute('aria-label', 'Back to top');
    
    // Using Lucide Chevron Up icon - it will be initialized by the global lucide.createIcons() call
    // if we haven't already run it, or we can manually trigger it for this element.
    btn.innerHTML = '<i data-lucide="chevron-up"></i>';
    
    document.body.appendChild(btn);

    // Re-run lucide to iconify the new element
    if (typeof lucide !== 'undefined') {
      lucide.createIcons({
        attrs: {
          class: 'lucide-icon'
        },
        nameAttr: 'data-lucide',
        icons: ['ChevronUp']
      });
      // Fallback: just ensure it's created for this specific element
      lucide.createIcons();
    }

    // Scroll listener
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Click handler
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // Initialize Back to Top
  createBackToTop();
});
