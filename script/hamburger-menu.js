/**
 * Hamburger Menu Toggle
 * Controls the mobile menu visibility
 */

function initHamburgerMenu() {
  const menuToggle = document.querySelector('.hamburger-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

  if (!menuToggle || !mobileMenu) {
    // Elements not found yet, retry after a short delay
    setTimeout(initHamburgerMenu, 100);
    return;
  }

  // Toggle menu visibility when clicking hamburger
  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    
    // Toggle classes
    const isOpen = mobileMenu.classList.toggle('is-open');
    if (isOpen) {
      menuToggle.classList.add('is-active');
    } else {
      menuToggle.classList.remove('is-active');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    const clickedOnToggle = e.target.closest('.hamburger-menu-toggle');
    const clickedOnMenu = e.target.closest('.mobile-menu');
    
    if (!clickedOnToggle && !clickedOnMenu) {
      mobileMenu.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
    }
  });

  // Close menu when clicking a menu item (navigation)
  mobileMenuItems.forEach(item => {
    item.addEventListener('click', function() {
      mobileMenu.classList.remove('is-open');
      menuToggle.classList.remove('is-active');
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initHamburgerMenu, 100);
  });
} else {
  // DOM already loaded
  setTimeout(initHamburgerMenu, 100);
}
