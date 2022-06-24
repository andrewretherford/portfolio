// state variables
// ------------------------------------------------------------ //


// functions
// ------------------------------------------------------------ //

function showHide(element) {
    element.classList.toggle('hide')
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


// event handlers 
// ------------------------------------------------------------ //

function homeMenuNavHandler(e) {
    if(e.target.tagName != 'IMG') return;
    switch(e.target.id) {

        case 'favorite-things-nav':
            // showHide(homePageContainer)
            break

        case 'bio-resume-nav': console.log('bio case')
            showHide(homePageContainer)
            showHide(bioPageContainer)
            break

        case 'project-showcase-nav':
            showHide(homePageContainer)
            showHide(projectPageContainer)
            break
        
        case 'professional-links':
            break

        case 'sites-of-interest':
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

// event listeners 
// ------------------------------------------------------------ //

homeMenuNavContainer.addEventListener('click', homeMenuNavHandler)
bioBack.addEventListener('click', toHomeHandler)
projectBack.addEventListener('click', toHomeHandler)

