/* ============================================================================== */
/* ================================ DOM Elements ================================ */
/* ============================================================================== */

/* ----------------------------------- Navbar ----------------------------------- */
const navbar = document.querySelector('.navbar')

/* ------------------------------- Page Containers ------------------------------ */
const homePageContainer = document.querySelector('.home-page-container')
const aboutPageContainer = document.querySelector('.about-page-container')
const projectPageContainer = document.querySelector('.project-page-container')

/* ------------------------------------ About ----------------------------------- */
const pies = document.querySelectorAll('.pie')
const subCategories = document.querySelectorAll('.sub-category')

/* ------------------------------ Project Carousel ------------------------------ */
const carouselContainer = document.querySelector('.carousel-container')
const slideContainer = document.querySelector('.slide-container')
const projectArrows = document.querySelector('.project-arrows')
const slides = document.querySelectorAll('.card')

/* ------------------------------- Modal Carousel ------------------------------- */
const modals = document.querySelectorAll('.modal')
const modalImages = {slide1Current: 0, slide2Current: 0, slide3Current: 0, slide4Current: 0}
modalImages.slide1 = document.querySelectorAll('#slide1-modal>div>div>div div')
modalImages.slide2 = document.querySelectorAll('#slide2-modal>div>div>div div')
modalImages.slide3 = document.querySelectorAll('#slide3-modal>div>div>div div')
modalImages.slide4 = document.querySelectorAll('#slide4-modal>div>div>div div')

/* ============================================================================== */
/* ============================== GLOBAL VARIABLES ============================== */
/* ============================================================================== */

/* ----------------------------------- Navbar ----------------------------------- */
let currentPage = homePageContainer

/* ------------------------------------ About ------------------------------------ */
const projectCategories = {
    fullstack: {
        count: 2, 
        percent: null, 
        subCategories: {
            django: {count: 1, percent: null},
            javascript: {count: 4, percent: null},
            python: {count: 1, percent: null},
        }
    },
    frontend: {
        count: 4, 
        percent: null, 
        subCategories: {
            react: {count: 2, percent: null},
            css: {count: 4, percent: null},
            html: {count: 2, percent: null},
        }
    },
    backend: {
        count: 2, 
        percent: null, 
        subCategories: {
            express: {count: 1, percent: null},
            mongoose: {count: 1, percent: null},
            mongodb: {count: 1, percent: null},
            sql: {count: 1, percent: null}
        }
    },
}

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

/* ----------------------------------- Navbar ----------------------------------- */

function navigate(destination, origin) {
    !origin.classList.contains('hide') && origin.classList.add('hide')
    destination.classList.contains('hide') && destination.classList.remove('hide')
    currentPage = destination
}

/* ------------------------------------ About ----------------------------------- */

function setPercentages(categories) {
    const keys = Object.keys(categories)
    let total = 0

    keys.forEach(key => {
        let subTotal = 0
        total += categories[key].count
        let subKeys = Object.keys(categories[key].subCategories)
        subKeys.forEach(subKey => subTotal += categories[key].subCategories[subKey].count)
        subKeys.forEach(subKey => categories[key].subCategories[subKey].percent = (categories[key].subCategories[subKey].count / subTotal * 100).toFixed(2))
    })
    keys.forEach(key => categories[key].percent = (categories[key].count / total * 100).toFixed(2))
}

function displayPercentages(pies, subCategories, categories) {
    pies.forEach(pie => {
        pie.style = `--p:${categories[pie.classList[1]].percent}`
        pie.innerText = `${categories[pie.classList[1]].percent}%`
        let subKeys = Object.keys(categories[pie.classList[1]].subCategories)
        subCategories.forEach(category => subKeys.indexOf(category.classList[1]) != -1 && (category.innerText = `${categories[pie.classList[1]].subCategories[category.classList[1]].percent}%`))
    })

    categoryKeys = Object.keys(categories)
    
}

setPercentages(projectCategories)

displayPercentages(pies, subCategories, projectCategories)

/* ---------------------------------- Projects ---------------------------------- */

function setMainSlide(currentSlide, direction) {

    function toggleSlide(slide) {
        slide.classList.toggle('main')
        slide.classList.toggle('side')
    }

    switch(currentSlide) {
        case 0:
            toggleSlide(slides[currentSlide])
            toggleSlide(slides[currentSlide + 1])
            break
            
        case 3:
            toggleSlide(slides[currentSlide])
            toggleSlide(slides[currentSlide - 1])
            break

        default:
            if (direction === 'left') {
                toggleSlide(slides[currentSlide])
                toggleSlide(slides[currentSlide + 1])
            } else {
                toggleSlide(slides[currentSlide])
                toggleSlide(slides[currentSlide - 1])
            }
            break
    }
}

function moveSlide() {
    const style = getComputedStyle(carouselContainer)
    let offset
    
    switch(style.width) {
        case '1035px':
            offset = 345
            break

        case '415px':
            offset = 35
            break
        
        case '345px':
            offset = 0
            break
        
        default:
            break
    }

    const translateChange = (currentSlide) * -345 + offset
    slideContainer.style.transform = `translate(${translateChange}px)`
}

/* ============================================================================== */
/* =============================== EVENT HANDLERS =============================== */
/* ============================================================================== */

/* ----------------------------------- Navbar ----------------------------------- */

function navHandler(e) {
    if(e.target.tagName !== 'SPAN') return
    const currentMenuItem = document.querySelector('.current-menu-item')
    currentMenuItem.classList.remove('current-menu-item')
    e.target.classList.add('current-menu-item')
    switch(e.target.id) {
        case 'home-nav':
            navigate(homePageContainer, currentPage)
            break

        case 'about-nav':
            navigate(aboutPageContainer, currentPage)
            break

        case 'projects-nav':
            navigate(projectPageContainer, currentPage)
            break

        default: return
    }
}

/* ---------------------------------- Projects ---------------------------------- */

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

    moveSlide()
}

function modalShowHandler(e) {
    if(e.currentTarget.classList.contains('card') && !e.currentTarget.classList.contains('side')) {
        showHide(modals[e.currentTarget.id[5] -1])
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
        let slide = 'slide' + e.currentTarget.id[5]
        let current = slide + 'Current'
    
        showHide(modalImages[slide][modalImages[current]])
        if(e.target.id == 'modal-left') {
            modalImages[current] > 0 ? modalImages[current] -= 1 : modalImages[current] = modalImages[slide].length -1
        } else {
            modalImages[current] < modalImages[slide].length -1 ? modalImages[current] += 1 : modalImages[current] = 0
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
window.addEventListener('resize', moveSlide)
projectArrows.addEventListener('click', projectCarouselHandler)

/* -------------------------------- Project Modal ------------------------------- */
slides.forEach(slide => slide.addEventListener('click', modalShowHandler))
modals.forEach(modal => modal.addEventListener('click', modalHandler))
