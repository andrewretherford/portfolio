// DOM Elements
// ------------------------------------------------------------ //

// Page Containers
const homePageContainer = document.querySelector('.home-page-container')
const bioPageContainer = document.querySelector('.bio-page-container')
const projectPageContainer = document.querySelector('.project-page-container')

// Nav Elements
const bioResumeNav = document.querySelector('#bio-resume-nav')
const projectShowcaseNav = document.querySelector('project-showcase-nav')
const bioBack = document.querySelector('#bio-back')
const projectBack = document.querySelector('#project-back')
const homeMenuNavContainer = document.querySelector('.home-menu-nav-container')
const professionalLinksNav = document.querySelector('#professional-links-nav')
const sitesOfInterestNav = document.querySelector('#sites-of-interest-nav')
const professionalLinks = document.querySelector('.professional-links')
const sitesOfInterest = document.querySelector('.sites-of-interest')
const navbar = document.querySelector('.navbar')

// Carousel
const slideContainer = document.querySelector('.slide-container')
const arrowContainer = document.querySelector('.arrow-container')
const slides = document.querySelectorAll('.card')

// Modal
const modals = document.querySelectorAll('.modal')
// const resumeModal = document.querySelector('#resume-modal')
// const resumeLink = document.querySelector('#resume-link')

// Global Variables
// ------------------------------------------------------------ //

let currentPage = homePageContainer
let currentSlide = 1

// Utility Functions
// ------------------------------------------------------------ //

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

    console.log(currentSlide)
    switch(currentSlide) {
        case 0:
            console.log('case 0')
            toggleSlide(slides[1])
            toggleSlide(slides[0])
            break

        case 1:
            console.log('case 1')
            if(direction == 'left') {
                toggleSlide(slides[2])
                toggleSlide(slides[1])
            } else {
                toggleSlide(slides[0])
                toggleSlide(slides[1])
            }
            break

        case 2:
            console.log('case 2')
            if(direction == 'left') {
                toggleSlide(slides[3])
                toggleSlide(slides[2])
            } else {
                toggleSlide(slides[1])
                toggleSlide(slides[2])
            }
            break

        case 3:
            console.log('case 3')
            toggleSlide(slides[2])
            toggleSlide(slides[3])
            break

        default:
            break
    }
}

// function expandOrShrink(element) {
//     if(element.classList.contains('shrink')) {
//         element.classList.toggle('shrink')
//         element.classList.toggle('expand')
//     } else if(element.classList.contains('expand')) {
//         element.classList.toggle('expand')
//         element.classList.toggle('shrink')
//     } else {
//         element.classList.toggle('expand')
//     }
// }

// Event Handlers
// ------------------------------------------------------------ //

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

function carouselHandler(e) {
    console.log(e.target.id)
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

    const translateChange = (currentSlide) * -370 + 365
    slideContainer.style.transform = `translate(${translateChange}px)`
}

// function navExpandHandler(e) {
//     if(e.target.tagName != 'IMG') return;
    
//     let profExpandTimeout, siteExpandTimeout

//     switch(e.target.id) {

//         case 'professional-links-nav':
//             showHide(professionalLinksNav)
//             showHide(professionalLinks)
//             let profChildren = professionalLinks.children
//             clearTimeout(profExpandTimeout)
//             for(let i=0; i < profChildren.length; i++) {
//                 profExpandTimeout = setTimeout(expandOrShrink, 10, profChildren[i])
//             }
//             break

//         case 'sites-of-interest-nav':
//             showHide(sitesOfInterestNav)
//             showHide(sitesOfInterest)
//             let siteChildren = sitesOfInterest.children
//             clearTimeout(siteExpandTimeout)
//             for(let i=0; i < siteChildren.length; i++) {
//                 siteExpandTimeout = setTimeout(expandOrShrink, 10, siteChildren[i])
//             }
//             break

//         default: return
//     }
// }

// function navShrinkHandler(e) {
//     if(e.target.tagName != 'DIV') return;

//     let profNavTimeout, profLinksTimeout, siteNavTimeout, siteTimeout

//     switch(e.target.id) {

//         case 'professional-links-div': 
//             clearTimeout(profNavTimeout)
//             clearTimeout(profLinksTimeout)
//             profNavTimeout = setTimeout(showHide, 500, professionalLinksNav)
//             profLinksTimeout = setTimeout(showHide, 500, professionalLinks)
//             let profChildren = professionalLinks.children
//             for(let i=0; i < profChildren.length; i++) {
//                 expandOrShrink(profChildren[i])
//             }
//             break

//         case 'sites-of-interest-div':
//             clearTimeout(siteNavTimeout)
//             clearTimeout(siteTimeout)
//             siteNavTimeout = setTimeout(showHide, 500, sitesOfInterestNav)
//             siteTimeout = setTimeout(showHide, 500, sitesOfInterest)
//             let siteChildren = sitesOfInterest.children
//             for(let i=0; i < siteChildren.length; i++) {
//                 expandOrShrink(siteChildren[i])
//             }
//             break

//         default: return
//     }
// }

function modalShowHandler(e) {
    if(e.currentTarget.classList.contains('card')) {
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
    }
}

function modalHideHandler(e) {
    console.log('modalHideHandler')
    if(e.target.classList.contains('modal')) {
        showHide(e.target)
    }
}

// function toHomeHandler(e) {
//     if(e.target.tagName != 'NAV') return;

//     switch(e.target.id) {

//         case 'bio-back':
//             showHide(bioPageContainer)
//             showHide(homePageContainer)
//             break

//         case 'project-back':
//             showHide(projectPageContainer)
//             showHide(homePageContainer)
//             break

//         default: return
//     }
// }

// event listeners 
// ------------------------------------------------------------ //

// home menu center navs
// homeMenuNavContainer.addEventListener('click', homeMenuNavHandler)
navbar.addEventListener('click', navHandler)

arrowContainer.addEventListener('click', carouselHandler)
// slideContainer.addEventListener('click', modalShowHandler)
slides.forEach(slide => slide.addEventListener('click', modalShowHandler))
modals.forEach(modal => modal.addEventListener('click', modalHideHandler))

// expanding navs
// professionalLinksNav.addEventListener('mouseenter', navExpandHandler)
// sitesOfInterestNav.addEventListener('mouseenter', navExpandHandler)
// professionalLinks.addEventListener('mouseleave', navShrinkHandler)
// sitesOfInterest.addEventListener('mouseleave', navShrinkHandler)

// back buttons
// bioBack.addEventListener('click', toHomeHandler)
// projectBack.addEventListener('click', toHomeHandler)

// interaction listeners
