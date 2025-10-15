const slides = Array.from(document.querySelectorAll('.slide'))
const dotsEl = document.getElementById('dots')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const slidesContainer = document.getElementById('slides')
const progressText = document.getElementById('progressText')

let index = 0

function renderDots(){
  dotsEl.innerHTML = ''
  slides.forEach((_, i) => {
    const d = document.createElement('div')
    d.className = 'dot' + (i === index ? ' active' : '')
    d.title = (i+1) + ' — ' + (slides[i].dataset.title || '')
    d.addEventListener('click', () => go(i))
    dotsEl.appendChild(d)
  })
}

function go(i){
  if(i < 0 || i >= slides.length) return
  slides[index].classList.remove('is-active')
  index = i
  slides[index].classList.add('is-active')
  progressText.textContent = `${index+1} / ${slides.length}`
  renderDots()
}

function next(){ go(Math.min(index + 1, slides.length - 1)) }
function prev(){ go(Math.max(index - 1, 0)) }

prevBtn.addEventListener('click', prev)
nextBtn.addEventListener('click', next)

// Keyboard navigation
window.addEventListener('keydown', (e) => {
  if(['ArrowRight','PageDown',' '].includes(e.key)) { e.preventDefault(); next() }
  if(['ArrowLeft','PageUp','Backspace'].includes(e.key)) { e.preventDefault(); prev() }
  if(e.key === 'Home') go(0)
  if(e.key === 'End') go(slides.length - 1)
})

// Click anywhere to advance (except buttons)
slidesContainer.addEventListener('click', (e) => {
  if(e.target.closest('button')) return
  next()
})

// Initialize
renderDots()
go(0)


