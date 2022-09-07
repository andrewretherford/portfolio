/* ============================================================================== */
/* ================================ DOM Elements ================================ */
/* ============================================================================== */

/* ----------------------------------- Navbar ----------------------------------- */
const navbar = document.querySelector('.navbar')

/* ------------------------------- Page Containers ------------------------------ */
const homePageContainer = document.querySelector('.home-page-container')
const bioPageContainer = document.querySelector('.bio-page-container')
const projectPageContainer = document.querySelector('.project-page-container')

/* ------------------------------- Bio/Experience ------------------------------- */


/* ------------------------------ Project Carousel ------------------------------ */
const carouselContainer = document.querySelector('.carousel-container')
const slideContainer = document.querySelector('.slide-container')
const projectArrows = document.querySelector('.project-arrows')
const slides = document.querySelectorAll('.card')

/* ------------------------------- Modal Carousel ------------------------------- */
const modals = document.querySelectorAll('.modal')
const modalImages = {slide1Current: 0, slide2Current: 0, slide3Current: 0, slide4Current: 0}
modalImages.slide1 = document.querySelectorAll('#slide1-modal img')
modalImages.slide2 = document.querySelectorAll('#slide2-modal img')
modalImages.slide3 = document.querySelectorAll('#slide3-modal img')
modalImages.slide4 = document.querySelectorAll('#slide4-modal img')

/* ============================================================================== */
/* ============================== GLOBAL VARIABLES ============================== */
/* ============================================================================== */

/* ----------------------------------- Navbar ----------------------------------- */
let currentPage = homePageContainer

/* ------------------------------ Project Carousel ------------------------------ */
let currentSlide = 1

/* ------------------------------- Modal Carousel ------------------------------- */
let modalImageIndex = []


/* ============================================================================== */
/* ============================== UTILITY FUNCTIONS ============================= */
/* ============================================================================== */

function showHide(element) {
    element.classList.toggle('hide')
}

function toggle(element) {
    element.classList.toggle('vanish')
}

function navigate(destination, origin) {
    !origin.classList.contains('hide') && origin.classList.add('hide')
    destination.classList.contains('hide') && destination.classList.remove('hide')
    currentPage = destination
}

function setMainSlide(currentSlide, direction) {

    function toggleSlide(slide) {
        slide.classList.toggle('main')
        slide.classList.toggle('side')
    }

    switch(currentSlide) {
        case 0:
            toggleSlide(slides[1])
            toggleSlide(slides[0])
            break

        case 1:
            if(direction == 'left') {
                toggleSlide(slides[2])
                toggleSlide(slides[1])
            } else {
                toggleSlide(slides[0])
                toggleSlide(slides[1])
            }
            break

        case 2:
            if(direction == 'left') {
                toggleSlide(slides[3])
                toggleSlide(slides[2])
            } else {
                toggleSlide(slides[1])
                toggleSlide(slides[2])
            }
            break

        case 3:
            toggleSlide(slides[2])
            toggleSlide(slides[3])
            break

        default:
            break
    }
}

/* ============================================================================== */
/* =============================== EVENT HANDLERS =============================== */
/* ============================================================================== */

function navHandler(e) {
    if(e.target.tagName !== 'SPAN') return
    const currentMenuItem = document.querySelector('.current-menu-item')
    currentMenuItem.classList.remove('current-menu-item')
    e.target.classList.add('current-menu-item')
    switch(e.target.id) {
        case 'home-nav':
            navigate(homePageContainer, currentPage)
            break

        case 'bio-nav':
            navigate(bioPageContainer, currentPage)
            break

        case 'projects-nav':
            navigate(projectPageContainer, currentPage)
            break

        default: return
    }
}

function projectCarouselHandler(e) {    
    switch(e.target.id) {
        case 'left':
            if(currentSlide > 0) {
                currentSlide--
                setMainSlide(currentSlide, 'left')
            }
            break

        case 'right':
            if(currentSlide < 3) {
                currentSlide++
                setMainSlide(currentSlide, 'right')
            }
            break
        
        default:
            break
    }

    const style = getComputedStyle(carouselContainer)
    if(style.width == '1100px') {
        const translateChange = (currentSlide) * -370 + 365
        slideContainer.style.transform = `translate(${translateChange}px)`
    } else {
        const translateChange = (currentSlide) * -370 + 15
        slideContainer.style.transform = `translate(${translateChange}px)`
    }
}

function windowResizeHandler() {
    const style = getComputedStyle(carouselContainer)
    console.log("- style.width", style.width)
    if(style.width == '1100px') {
        const translateChange = (currentSlide) * -370 + 365
        slideContainer.style.transform = `translate(${translateChange}px)`
    } else {
        const translateChange = (currentSlide) * -370 + 15
        slideContainer.style.transform = `translate(${translateChange}px)`
    }
}

function modalShowHandler(e) {
    if(e.currentTarget.classList.contains('card') && !e.currentTarget.classList.contains('side')) {
        switch(e.currentTarget.id) {
            case 'slide1':
                showHide(modals[0])
                break
            
            case 'slide2':
                showHide(modals[1])
                break
            
            case 'slide3':
                showHide(modals[2])
                break
            
            case 'slide4':
                showHide(modals[3])
                break
            
            default:
                break
        }
        showHide(projectArrows)
    }
}

function modalHandler(e) {

    switch(true) {
        case e.target.classList.contains('arrow'):
            imageSwitch()
            break
        
        case e.target.classList.contains('modal'):
            showHide(e.target)
            showHide(projectArrows)
            break

        default:
            break
    }
    
    function imageSwitch() {
        let slide, current

        switch(e.currentTarget.id) {
            case 'slide1-modal':
                slide = 'slide1'
                current = 'slide1Current'
                break
            
            case 'slide2-modal':
                slide = 'slide2'
                current = 'slide2Current'
                break
            
            case 'slide3-modal':
                slide = 'slide3'
                current = 'slide3Current'
                break
            
            case 'slide4-modal':
                slide = 'slide4'
                current = 'slide4Current'
                break
            
            default:
                break
        }

        showHide(modalImages[slide][modalImages[current]])
        if(e.target.id == 'modal-left') {
            modalImages[current] > 0 ? modalImages[current] -= 1 : modalImages[current] = 3
        } else {
            modalImages[current] < 3 ? modalImages[current] += 1 : modalImages[current] = 0
        }
        showHide(modalImages[slide][modalImages[current]])
    }
}

/* ============================================================================== */
/* =============================== EVENT LISTENERS ============================== */
/* ============================================================================== */

/* ----------------------------------- Navbar ----------------------------------- */
navbar.addEventListener('click', navHandler)

/* ------------------------------ Project Carousel ------------------------------ */
window.addEventListener('resize', windowResizeHandler)
projectArrows.addEventListener('click', projectCarouselHandler)

/* -------------------------------- Project Modal ------------------------------- */
slides.forEach(slide => slide.addEventListener('click', modalShowHandler))
modals.forEach(modal => modal.addEventListener('click', modalHandler))
