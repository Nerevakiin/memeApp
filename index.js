import {catsData} from './data.js'


const getImageBtn = document.getElementById('get-image-btn')
const emotionRadios = document.getElementById("emotion-radios")
const gifsOnly = document.getElementById("gifs-only-option")
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const closeModalBtn = document.getElementById('meme-modal-close-btn')



emotionRadios.addEventListener("change", highlightCheckedOption)
getImageBtn.addEventListener('click', renderCat)



//test place
memeModal.addEventListener('click', function(e){
    
    if (e.target === memeModal){
        memeModal.style.display = "none"
    }
    
})





//UI in select/deselect radio choice
    
function highlightCheckedOption(e){

    const radiosArray = document.getElementsByClassName('radio')
    for (let radios of radiosArray) {
        radios.classList.remove("highlight")
    }
    
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}





//This will use the cat object provided by getSingleCatObject to create HTML string which it will render it to the DOM
function renderCat() {
    
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML = `
        <img
        class="cat-img"
        src="./images/${catObject.image}"
        alt="${catObject.alt}">
    `
    memeModal.style.display = "flex"
}

//add functionality to the X button which closes the modal
closeModalBtn.addEventListener('click', function(){
    memeModal.style.display = "none"
})





//This will return a single cat object selected from the array provided by getMatchingCatsArray
function getSingleCatObject() {
    
    const catsArray = getMatchingCatsArray()
    
    if (catsArray === 1) {
        return catsArray[0]
    } else {
        return catsArray[Math.floor(Math.random() * catsArray.length)]
    }
    
}




//This returns an array of cat objects that matches the user's criteria (the selected emotion)
function getMatchingCatsArray(){ 
    if (document.querySelector('input[type=radio]:checked')){
        const selectedEmotion = document.querySelector('input[type=radio]:checked').value
        const isGif = gifsOnly.checked

        //filtering the array either with gif only cats or all cats
        const matchedCats = catsData.filter(function(cat){
            if (isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
            
        })
        return matchedCats
    }
}




//Create an empty array and fill it with the data imported 
function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray 
}






//Render the emotion choices on the DOM
function renderEmotionsRadios(cats){
    const emotions = getEmotionsArray(cats)
    let emotionsList = " "

    for (let emotionHtml of emotions){
        emotionsList += `<div class="radio">
                <input
                type="radio"
                id="${emotionHtml}"
                value="${emotionHtml}"
                name="emotion-choice"
                >
                <label for="${emotionHtml}">${emotionHtml}</label> 
            </div>`
    }
    emotionRadios.innerHTML = emotionsList 
}


renderEmotionsRadios(catsData) 



