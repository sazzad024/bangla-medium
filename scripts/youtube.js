const videoState = {
    currentVideo:null,
    bodyClass:'modal-open',
    backDrop: document.querySelector('.modal-backdrop'),
    closeBtnUi: document.querySelector('.home-video-close'),
    videoModal: document.getElementById('home-video-modal')
}


const launchVideoModal = ()=>{
    //console.log(event.target.closest('button'))
    videoState.videoModal.classList.add('d-block')
    videoState.backDrop.classList.remove('d-none')
    videoState.backDrop.classList.add('show')
    document.body.classList.add(videoState.bodyClass)
    const ytPlayer = videoState.videoModal.querySelector('#yt-player')
    const ytId = event.target.closest('button').dataset.id

    if(ytPlayer && ytId){
        ytPlayer.src = `https://www.youtube.com/embed/${ytId}?enablejsapi=1&origin=http://example.com`
    }

}

const closeVideoModal = ()=>{
    document.body.classList.remove(videoState.bodyClass)
    videoState.backDrop.classList.remove('show')
    videoState.backDrop.classList.add('d-none')
    videoState.videoModal.classList.remove('d-block')
    videoState.videoModal.querySelector('#yt-player').src = ''
}

const setIframe = (ui)=>{
    ui.forEach(elem=>{
        elem.addEventListener('click',launchVideoModal)
    })
    videoState.closeBtnUi.addEventListener('click',closeVideoModal)
}

export default setIframe 