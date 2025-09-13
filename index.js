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
getImageBtn.addEventListener('click', getMatchingCatsArray)

function getMatchingCatsArray(e){
    if (document.querySelector('input[type=radio]:checked')){
        const selectedEmotion = document.querySelector('input[type=radio]:checked').value
        console.log(selectedEmotion)
    }
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



