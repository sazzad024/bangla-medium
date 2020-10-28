/**
 * TAB
 * =====
 * - Tab navigation (content-target,tab-target=>display:block)
 */

 const handleNavigation = (contentTarget)=>{

    const parent = event.target.parentNode 
    parent.querySelectorAll('*').forEach(elem=>elem.classList.remove('active'))
    event.target.classList.add('active')

    document.querySelector(contentTarget)
        .querySelectorAll('*').forEach(elem=>elem.classList.remove('active'))
    document.querySelector(event.target.dataset.target).classList.add('active')   

 }
 const navigateTab = (navigationUi) =>{
     const contentTarget = navigationUi.dataset.content 
     const children = navigationUi.querySelectorAll('*')
     children.forEach(child=>child.addEventListener('click',_=>handleNavigation(contentTarget)))
 }

 export default navigateTab