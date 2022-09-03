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

// Modal
const resumeModal = document.querySelector('#resume-modal')
const resumeLink = document.querySelector('#resume-link')

// Global Variables
// ------------------------------------------------------------ //

let currentPage = homePageContainer

// Utility Functions
// ------------------------------------------------------------ //

function showHide(element) {
    element.classList.toggle('hide')
}

function navigate(destination, origin) {
    !origin.classList.contains('hide') && origin.classList.add('hide')
    destination.classList.contains('hide') && destination.classList.remove('hide')
    currentPage = destination
}

function expandOrShrink(element) {
    if(element.classList.contains('shrink')) {
        element.classList.toggle('shrink')
        element.classList.toggle('expand')
    } else if(element.classList.contains('expand')) {
        element.classList.toggle('expand')
        element.classList.toggle('shrink')
    } else {
        element.classList.toggle('expand')
    }
}

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

function navExpandHandler(e) {
    if(e.target.tagName != 'IMG') return;
    
    let profExpandTimeout, siteExpandTimeout

    switch(e.target.id) {

        case 'professional-links-nav':
            showHide(professionalLinksNav)
            showHide(professionalLinks)
            let profChildren = professionalLinks.children
            clearTimeout(profExpandTimeout)
            for(let i=0; i < profChildren.length; i++) {
                profExpandTimeout = setTimeout(expandOrShrink, 10, profChildren[i])
            }
            break

        case 'sites-of-interest-nav':
            showHide(sitesOfInterestNav)
            showHide(sitesOfInterest)
            let siteChildren = sitesOfInterest.children
            clearTimeout(siteExpandTimeout)
            for(let i=0; i < siteChildren.length; i++) {
                siteExpandTimeout = setTimeout(expandOrShrink, 10, siteChildren[i])
            }
            break

        default: return
    }
}

function navShrinkHandler(e) {
    if(e.target.tagName != 'DIV') return;

    let profNavTimeout, profLinksTimeout, siteNavTimeout, siteTimeout

    switch(e.target.id) {

        case 'professional-links-div': 
            clearTimeout(profNavTimeout)
            clearTimeout(profLinksTimeout)
            profNavTimeout = setTimeout(showHide, 500, professionalLinksNav)
            profLinksTimeout = setTimeout(showHide, 500, professionalLinks)
            let profChildren = professionalLinks.children
            for(let i=0; i < profChildren.length; i++) {
                expandOrShrink(profChildren[i])
            }
            break

        case 'sites-of-interest-div':
            clearTimeout(siteNavTimeout)
            clearTimeout(siteTimeout)
            siteNavTimeout = setTimeout(showHide, 500, sitesOfInterestNav)
            siteTimeout = setTimeout(showHide, 500, sitesOfInterest)
            let siteChildren = sitesOfInterest.children
            for(let i=0; i < siteChildren.length; i++) {
                expandOrShrink(siteChildren[i])
            }
            break

        default: return
    }
}

function resumeLinkHandler(e) {
    showHide(resumeModal)
    console.log('clicked')
}

function windowClickHandler(e) {
    if(e.target == resumeModal) {
        showHide(resumeModal)
    }

    // if(!homePageContainer.classList.contains('hide') && e.target.tagName != 'IMG') {
    //     if(!professionalLinks.classList.contains('hide')) {
    //         showHide(professionalLinks)
    //         showHide(professionalLinksNav)
    //     }
    //     if(!sitesOfInterest.classList.contains('hide')) {
    //         showHide(sitesOfInterest)
    //         showHide(sitesOfInterestNav)
    //     }
    // }
}

function toHomeHandler(e) {
    if(e.target.tagName != 'NAV') return;

    switch(e.target.id) {

        case 'bio-back':
            showHide(bioPageContainer)
            showHide(homePageContainer)
            break

        case 'project-back':
            showHide(projectPageContainer)
            showHide(homePageContainer)
            break

        default: return
    }
}

// event listeners 
// ------------------------------------------------------------ //

// home menu center navs
// homeMenuNavContainer.addEventListener('click', homeMenuNavHandler)
navbar.addEventListener('click', navHandler)

// expanding navs
// professionalLinksNav.addEventListener('mouseenter', navExpandHandler)
// sitesOfInterestNav.addEventListener('mouseenter', navExpandHandler)
// professionalLinks.addEventListener('mouseleave', navShrinkHandler)
// sitesOfInterest.addEventListener('mouseleave', navShrinkHandler)

// back buttons
// bioBack.addEventListener('click', toHomeHandler)
// projectBack.addEventListener('click', toHomeHandler)

// interaction listeners
resumeLink.addEventListener('click', resumeLinkHandler)
window.addEventListener('click', windowClickHandler)