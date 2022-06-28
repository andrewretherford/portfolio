// state variables
// ------------------------------------------------------------ //


// functions
// ------------------------------------------------------------ //

function showHide(element) {
    element.classList.toggle('hide')
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
        
        // case 'professional-links-nav':
        //     showHide(professionalLinksNav)
        //     showHide(professionalLinks)
        //     break

        // case 'sites-of-interest-nav':
        //     showHide(sitesOfInterestNav)
        //     showHide(sitesOfInterest)
        //     break

        default: return
    }
}

function navExpandHandler(e) {
    if(e.target.tagName != 'IMG') return;
    
    switch(e.target.id) {

        case 'professional-links-nav':
            showHide(professionalLinksNav)
            showHide(professionalLinks)
            let profChildren = professionalLinks.children
            for(let i=0; i < profChildren.length; i++) {
                setTimeout(expandOrShrink, 10, profChildren[i])
            }
            break

        case 'sites-of-interest-nav':
            showHide(sitesOfInterestNav)
            showHide(sitesOfInterest)
            let siteChildren = sitesOfInterest.children
            for(let i=0; i < siteChildren.length; i++) {
                setTimeout(expandOrShrink, 10, siteChildren[i])
            }
            break

        default: return
    }
}

function navShrinkHandler(e) {
    if(e.target.tagName != 'DIV') return;

    switch(e.target.id) {

        case 'professional-links-div': 
            profLinksTimeoutNav = setTimeout(showHide, 500, professionalLinksNav)
            profLinksTimeout = setTimeout(showHide, 500, professionalLinks)
            let profChildren = professionalLinks.children
            for(let i=0; i < profChildren.length; i++) {
                expandOrShrink(profChildren[i])
            }
            break

        case 'sites-of-interest-div':
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
homeMenuNavContainer.addEventListener('click', homeMenuNavHandler)

// expanding navs
professionalLinksNav.addEventListener('mouseenter', navExpandHandler)
sitesOfInterestNav.addEventListener('mouseenter', navExpandHandler)
professionalLinks.addEventListener('mouseleave', navShrinkHandler)
sitesOfInterest.addEventListener('mouseleave', navShrinkHandler)

// back buttons
bioBack.addEventListener('click', toHomeHandler)
projectBack.addEventListener('click', toHomeHandler)

// interaction listeners
resumeLink.addEventListener('click', resumeLinkHandler)
window.addEventListener('click', windowClickHandler)