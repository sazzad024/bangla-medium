const url = "https://bangla-medium.com/lazy-news?currentPage=1&limit=20"
const lazyNews = {
    total:100,
    news:[
        {
            id:1,
            image:"https://bangla-medium.com/image1.jpg",
            title:"A news title",
            smallBody:"A body that can contain not more than 50 words",
            createdAt: "20 June 2020",
            category:{
                name:"entertainment",
                link:"https://bangla-medium.com/category/entertainment"
            }
        },
        {
            id:1,
            image:"https://bangla-medium.com/image1.jpg",
            title:"A news title",
            smallBody:"A body that can contain not more than 50 words",
            createdAt: "20 June 2020",
            category:{
                name:"entertainment",
                link:"https://bangla-medium.com/category/entertainment"
            }
        },

    ]
}
import tmpl from 'blueimp-tmpl'
const lazyParent = document.getElementById('lazy-news-section')

//a spinner component
class Spinner{
    constructor(parent){
        this.parent = parent
        this.setEventListener()
    }
    setUi(){
        //For setting the UI
        this.parent.innerHTML = tmpl('<h3 class="text-primary">{%=o.title%}</h3>', {title:"My title"})
    }
    removeUi(){
        //For removing the UI

    }
    template(){
        //template of the loading
    }
    setEventListener(){
        //when viewport reach the bottom of the parent element it will start to load the content based on that !
        //after certain time it will not going to set the UI anymore based on some condition !

        window.addEventListener('scroll',event=>{
            console.log(window.scrollY + window.innerHeight)
        })


    }


}


lazyParent && new Spinner(lazyParent)

//news component

