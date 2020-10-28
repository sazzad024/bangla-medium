import '../styles/index.scss'
import Glide from '@glidejs/glide'
import tab from './tab'
import setIframe from './youtube'
import Sticky from 'sticky-js'
import baguetteBox from 'baguettebox.js'

 window.state = {
    left:0,
    interval:null,
    activeBreaking:null
}
//DOM
const bnDateUi = document.getElementById('top-bar-bn-date'),
    menuSearchBtn = document.getElementById('menu-search-btn'),
    menuSearchOverlay = document.getElementById('search-overlay'),
    breakingNewsUl = document.getElementById('breaking-news'),
    breakingLabelUi = document.getElementById('breaking-label'),
    featuredCarousel = '#home-featured-news',
    homeTab = document.getElementById('home-tab'),
    ytvideoIframeBtn = document.querySelectorAll('.yt-video-iframe-trigger'),
    copyrightYear = document.getElementById('copyright-year'),
    mobileMenuOpenUi = document.getElementById('mobile-menu-hamburger'),
    mobileMenuCloseUi = document.getElementById('mobile-menu-close'),
    mobileMenu = document.getElementById('main-menu'),
    navMainUi = document.getElementById('nav-main'),
    hasSubmenuUi = document.querySelector('.main-menu'),
    mainMenuParent = '#main-menu-parent',
    stickyCategory = '#sticky-category-menu',
    imageGalleryView = ".image-gallery-view"

const setACarousel = (element,options={}) =>{
    document.querySelector(element) && new Glide(element,options).mount()
}

const setBengaliDate = (ui)=>{
    const date = new Date(),
        options = {year: 'numeric', weekday: 'long', month: 'long', day: 'numeric' }
    ui.textContent = date.toLocaleDateString('bn',options)
}

const manageSearchOverlay = ()=>{
    const state = menuSearchOverlay.dataset.state == 'true' 
    menuSearchOverlay.classList[state?'remove':'add']('d-block')
    menuSearchOverlay.dataset.state = state?'false':'true'
    menuSearchBtn.querySelector('i').className = state?'fas fa-search':'fas fa-times'
}

const setSearchFunctionality = _=>{
   menuSearchBtn.addEventListener('click',manageSearchOverlay) 
}


const setMarquee = (ui)=>{
    const breakingLabelRightPoint = breakingLabelUi.getBoundingClientRect().left + breakingLabelUi.getBoundingClientRect().width 
    const activeBreakingRightPoint = state.activeBreaking.getBoundingClientRect().left + state.activeBreaking.getBoundingClientRect().width 
    if(breakingLabelRightPoint > activeBreakingRightPoint){
        state.left =breakingLabelUi.getBoundingClientRect().width;
        ui.removeChild(state.activeBreaking)
        ui.appendChild(state.activeBreaking)
        state.activeBreaking =ui.children[0]
    }
    ui.style.marginLeft = `${state.left}px`
    
}
const settingBreakingNewsInterval = ()=>setInterval(_=>{setMarquee(breakingNewsUl);state.left-=1},20)

const handleBreakingNewsHover = () =>{
    clearInterval(state.interval)

}
const handleBreakingNewsOut = ()=>{
    state.interval = settingBreakingNewsInterval()
}
const setBreakingNewsMarquee = ()=>{
    if(breakingNewsUl.children.length > 0){
        state.activeBreaking = breakingNewsUl.children[0]
        let totalWidth = 10000;
        [...breakingNewsUl.children].forEach(item=> {
            totalWidth+=item.getBoundingClientRect().width
        })
        breakingNewsUl.style.width=totalWidth *2 +'px'
        state.interval = settingBreakingNewsInterval()
        breakingNewsUl.addEventListener('mouseenter',_=>handleBreakingNewsHover())
        breakingNewsUl.addEventListener('mouseleave',_=>handleBreakingNewsOut())
    }
}
const setCopyrightText = (ui)=>{
    const year = new Date().getFullYear()
    ui.textContent = year;
}

const showMobileMenu = ()=>{
    mobileMenu.classList.add('show')
    navMainUi.classList.add('open')
    document.body.style.overflow = 'hidden'
}
const hideMobileMenu = ()=>{
    mobileMenu.classList.remove('show')
    navMainUi.classList.remove('open')
    document.body.style.overflow = ''
}
const toggleSubMenu = ()=>{
    event.preventDefault()
    const subMenu = event.target.parentElement.querySelector('.submenu')
    if(subMenu){
        const subMenuState = subMenu.dataset.mobile =='true'
        subMenu.classList[subMenuState?'remove':'add']('open')
        subMenu.dataset.mobile = subMenuState?'false':'true'
    }

}

const setMobileMenuJs = (openUi,closeUi)=>{
    
    const hasSubMenus = hasSubmenuUi.querySelectorAll('.has-submenu > a')
    hasSubMenus.length && hasSubMenus.forEach(submenu=>submenu.addEventListener('click',toggleSubMenu))
    
    openUi.addEventListener('click',showMobileMenu)
    closeUi.addEventListener('click',hideMobileMenu)

}

const removeBodyStyleOnLargeScreen = ()=>{
    if(window.innerWidth > 991){
        document.body.style = ''
    }
}

const windowResizeAdjust = ()=>{
    window.addEventListener('resize',removeBodyStyleOnLargeScreen)
}

const makeMenuSticky = ()=>{
    document.querySelector(mainMenuParent) && new Sticky(mainMenuParent)
}

const init = ()=>{
    //set Date to the top bar 
    bnDateUi && setBengaliDate(bnDateUi)

    //set main menu search functionality 
    menuSearchBtn && setSearchFunctionality()
    // setting mobile menu js
    mobileMenuOpenUi && mobileMenuCloseUi && setMobileMenuJs(mobileMenuOpenUi,mobileMenuCloseUi)

    //setting sticky menu js
    makeMenuSticky()

    setACarousel(featuredCarousel,{type:'carousel',autoplay:6000,animationDuration:500,animationTimingFunc:'ease'})

    //setting tab for home page 
    homeTab && tab(homeTab)

    //setting youtube video IFRAME 
    ytvideoIframeBtn.length && setIframe(ytvideoIframeBtn)

    //setting copyright text 
    copyrightYear && setCopyrightText(copyrightYear)

    //window resize adjustment
    windowResizeAdjust()

    breakingNewsUl && setBreakingNewsMarquee()

    //category sticky
    document.querySelector(stickyCategory) && new Sticky(stickyCategory)

    //setting image gallery
    document.querySelector(imageGalleryView) && baguetteBox.run(imageGalleryView) 
}

document.addEventListener('DOMContentLoaded',_=>init())



