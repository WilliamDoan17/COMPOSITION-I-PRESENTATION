const slides = Array.from(document.querySelectorAll('.slide'))
let currentSlide = 0
let isTransitioning = false

function showSlide(index) {
  if (isTransitioning) return
  
  isTransitioning = true
  
  // Add exit animation to current slide
  const currentActiveSlide = slides.find(slide => slide.classList.contains('is-active'))
  if (currentActiveSlide) {
    currentActiveSlide.classList.add('slide-exit')
  }
  
  // Remove all active classes
  slides.forEach(slide => {
    slide.classList.remove('is-active', 'slide-exit')
  })
  
  // Add entrance animation to new slide
  setTimeout(() => {
    slides[index].classList.add('is-active')
    
    // Reset animations for slide content
    resetSlideAnimations(slides[index])
    
    setTimeout(() => {
      isTransitioning = false
    }, 800) // Match CSS transition duration
  }, 100)
}

function resetSlideAnimations(slide) {
  // Reset all animated elements in the slide
  const animatedElements = slide.querySelectorAll('[class*="entrance"], .title, .subtitle, .author, .agenda-card')
  animatedElements.forEach((el, index) => {
    el.style.animation = 'none'
    el.offsetHeight // Trigger reflow
    el.style.animation = null
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length
  showSlide(currentSlide)
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length
  showSlide(currentSlide)
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault()
    nextSlide()
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault()
    prevSlide()
  }
})

// Click to advance
document.addEventListener('click', (e) => {
  if (!e.target.closest('.tech-status') && !e.target.closest('.data-viz')) {
    nextSlide()
  }
})

// Initialize
showSlide(0)
