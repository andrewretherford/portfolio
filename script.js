// state variables
// ------------------------------------------------------------ //


// functions
// ------------------------------------------------------------ //

function showHide(element) {
    element.classList.toggle('hide')
}

function popOut(element) {
    element.classList.toggle('pop')
}

// DOM elements 
// ------------------------------------------------------------ //

// page containers
const homePageContainer = document.querySelector('.home-page-container')
const bioPageContainer = document.querySelector('.bio-page-container')
const projectPageContainer = document.querySelector('.project-page-container')

// nav elements
const bioResumeNav = document.querySelector('#bio-resume-nav')
const projectShowcaseNav = document.querySelector('project-showcase-nav')
const bioBack = document.querySelector('#bio-back')
const projectBack = document.querySelector('#project-back')
const homeMenuNavContainer = document.querySelector('.home-menu-nav-container')
const professionalLinksNav = document.querySelector('#professional-links-nav')
const sitesOfInterestNav = document.querySelector('#sites-of-interest-nav')
const professionalLinks = document.querySelector('.professional-links')
const sitesOfInterest = document.querySelector('.sites-of-interest')

// modal
const resumeModal = document.querySelector('#resume-modal')
const resumeLink = document.querySelector('.resume-link')

// event handlers 
// ------------------------------------------------------------ //

function homeMenuNavHandler(e) {
    if(e.target.tagName != 'IMG') return;
    switch(e.target.id) {

        case 'favorite-things-nav':
            // showHide(homePageContainer)
            break

        case 'bio-resume-nav':
            showHide(homePageContainer)
            showHide(bioPageContainer)
            break

        case 'project-showcase-nav':
            showHide(homePageContainer)
            showHide(projectPageContainer)
            break
        
        case 'professional-links-nav':
            showHide(professionalLinksNav)
            showHide(professionalLinks)
            break

        case 'sites-of-interest-nav':
            showHide(sitesOfInterestNav)
            showHide(sitesOfInterest)
            break

        default: return
    }
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

function navHoverHandler(e) {
    if(e.target.tagName != 'IMG') return;
    switch(e.target.id) {

        case 'favorite-things-nav':
            // showHide(homePageContainer)
            break

        case 'bio-resume-nav':
            showHide(homePageContainer)
            showHide(bioPageContainer)
            break

        case 'project-showcase-nav':
            showHide(homePageContainer)
            showHide(projectPageContainer)
            break
        
        case 'professional-links-nav':
            showHide(professionalLinksNav)
            showHide(professionalLinks)
            break

        case 'sites-of-interest-nav':
            showHide(sitesOfInterestNav)
            showHide(sitesOfInterest)
            break

        default: return
    }
}

// event listeners 
// ------------------------------------------------------------ //

// nav listeners
homeMenuNavContainer.addEventListener('click', homeMenuNavHandler)
bioBack.addEventListener('click', toHomeHandler)
projectBack.addEventListener('click', toHomeHandler)

// modal listeners
resumeLink.onclick = function() {
    resumeModal.style.display = "block";
}
window.addEventListener('click', function(e) {
    if(e.target == resumeModal) {
        resumeModal.style.display = "none";
    }

    if(!homePageContainer.classList.contains('hide') && e.target.tagName != 'IMG') {
        if(!professionalLinks.classList.contains('hide')) {
            showHide(professionalLinks)
            showHide(professionalLinksNav)
        }
        if(!sitesOfInterest.classList.contains('hide')) {
            showHide(sitesOfInterest)
            showHide(sitesOfInterestNav)
        }
    }

})