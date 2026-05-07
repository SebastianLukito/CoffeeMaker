/**
 * Marquee scrolling system with bounce effect
 * Text bounces back and forth within the container
 * Shows: Coffee logo + application title
 */
class BounceMarquee {
  constructor(containerSelector, textContent) {
    this.container = document.querySelector(containerSelector);
    if (!document.querySelector(containerSelector)) {
      console.warn(`Marquee container ${containerSelector} not found`);
      return;
    }

    this.textContent = textContent; // "Javanese Iced Coffee Studio -- Made With Love by Sebastian"
    this.isMovingRight = false;
    this.animationFrameId = null;
    this.position = 0;
    this.speed = 1.5; // pixels per frame
    this.padding = 20;

    this.init();
  }

  init() {
    // Create marquee HTML structure with logo and text
    this.container.innerHTML = `
      <div class="marquee-content" id="marqueeContent">
        <div class="marquee-logo" aria-hidden="true"></div>
        <div class="marquee-text" id="marqueeText">${this.textContent}</div>
      </div>
    `;
    this.textElement = document.getElementById('marqueeContent'); // Animate the entire content

    // Use setTimeout to ensure DOM is fully updated
    setTimeout(() => this.startAnimation(), 10);
  }

  startAnimation() {
    this.measureDimensions();
    // Use setInterval as fallback for RAF issues
    this.animationFrameId = setInterval(() => this.animate(), 16); // ~60fps
    this.animate(); // Initial frame
  }

  measureDimensions() {
    // Get container width (without padding)
    this.containerWidth = this.container.clientWidth; // Use clientWidth instead of offsetWidth

    // Get content width  
    this.textWidth = this.textElement.offsetWidth;

    // Calculate max distance text can move left
    // Negative value = movement to the left
    // Content scrolls completely off to the left
    this.maxDistanceLeft = -(this.textWidth + 40);

    // Calculate max distance text can move right
    // Content scrolls completely off to the right
    this.maxDistanceRight = this.containerWidth + 5;

    // Reset position to start from right edge (0)
    this.position = 0;
    this.isMovingRight = false; // Start by moving LEFT
    this.textElement.style.transform = `translateX(${this.position}px)`;
  }

  animate = () => {
    // Move text
    if (!this.isMovingRight) {
      // Moving left
      this.position -= this.speed;

      // Check if text hit left edge (scrolled completely off left)
      if (this.position <= this.maxDistanceLeft) {
        this.position = this.maxDistanceLeft;
        this.isMovingRight = true; // Reverse direction
      }
    } else {
      // Moving right
      this.position += this.speed;

      // Check if text hit right edge (scrolled completely off right)
      if (this.position >= this.maxDistanceRight) {
        this.position = this.maxDistanceRight;
        this.isMovingRight = false; // Reverse direction
      }
    }

    // Apply transform
    this.textElement.style.transform = `translateX(${this.position}px)`;
  };

  updateText(newContent) {
    this.textContent = newContent;
    this.textElement.textContent = newContent;
    this.measureDimensions();
  }

  destroy() {
    if (this.animationFrameId) {
      clearInterval(this.animationFrameId); // Changed from cancelAnimationFrame
    }
  }
}

// Auto-initialize marquee on page load
function initMarquee() {
  const marqueeContainer = document.querySelector('.marquee-container');
  if (marqueeContainer) {
    const marqueeText = marqueeContainer.getAttribute('data-text');
    if (marqueeText) {
      new BounceMarquee('.marquee-container', marqueeText);
    }
  }
}

// Wait for React or other frameworks to finish rendering
// Use setTimeout to ensure DOM is fully updated after framework initialization
if (document.readyState === 'loading') {
  // DOM is loading, wait for DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMarquee, 200);
  });
} else {
  // DOM is already loaded, initialize after a small delay
  setTimeout(initMarquee, 200);
}
