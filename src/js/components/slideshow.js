// components/slideshow.js
export class Slideshow {
  constructor() {
    this.slides = document.querySelectorAll('.slide');
    this.dots = document.querySelectorAll('.dot');
    this.currentSlide = 0;
    this.slideInterval = null;
    this.hero = document.querySelector('.hero-slideshow');
    
    this.init();
  }

  showSlide(index) {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.dots.forEach(dot => dot.classList.remove('active'));
    
    this.slides[index].classList.add('active');
    this.dots[index].classList.add('active');
    this.currentSlide = index;
  }

  nextSlide() {
    const newIndex = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(newIndex);
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => this.nextSlide(), 5000);
  }

  init() {
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(this.slideInterval);
        this.showSlide(index);
        this.startSlideShow();
      });
    });

    // Pause on hover
    this.hero.addEventListener('mouseenter', () => clearInterval(this.slideInterval));
    this.hero.addEventListener('mouseleave', () => this.startSlideShow());

    // Initialize
    this.showSlide(0);
    this.startSlideShow();
  }
}