import {catsData} from './data.js'

function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            emotionsArray.push(emotion)
        }
    }
    return emotionsArray 
}

const emotionRadios = document.getElementById("emotion-radios")

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



