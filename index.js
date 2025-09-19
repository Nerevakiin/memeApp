import {catsData} from './data.js'


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


//Make the 'get image' btn functional by grabbin the id of the selected radio

const getImageBtn = document.getElementById('get-image-btn')
getImageBtn.addEventListener('click', renderCat)

//grabbing the animated gifs only button
const gifsOnly = document.getElementById("gifs-only-option")

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

//This will return a single cat object selected from the array provided by getMatchingCatsArray
function getSingleCatObject() {
    console.log("getsinglecatobject hit!")
    console.log(getMatchingCatsArray())
}

//This will use the cat object provided by getSingleCatObject to create HTML string which it will render it to the DOM
function renderCat() {
    console.log("rendercat hit")
    getSingleCatObject()
}


//UI in select/deselect radio choice
const emotionRadios = document.getElementById("emotion-radios")
emotionRadios.addEventListener("change", highlightCheckedOption)
    
function highlightCheckedOption(e){

    const radiosArray = document.getElementsByClassName('radio')
    for (let radios of radiosArray) {
        radios.classList.remove("highlight")
    }
    
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
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



