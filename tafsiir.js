let container = document.querySelector('.container');

let url = window.location.href;
// console.log(url)
let url_variable = url.split("?");
// console.log(url_variable)
let exactSurah = url_variable[1].split("=");
// console.log(exactSurah)

let offset = 0;
// console.log(offset)

let ayahCounter = 0;

const buildDom = (ayah, ayahNumber) => {
// console.log(ayah)
    if(ayahCounter < 1){ 

        let ayahSplit = ayah.split("بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ");
        // console.log(ayahSplit)

        container.innerHTML += `<div id="bisin"><a href ="#" dir="rtl" lang="ar">بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ</a></div>`;

        container.innerHTML += `<div  id="ayah"><a href ="#" dir="rtl" lang="ar">${ayahSplit[1]}
         <img src="./images/ayah.png" id="ayahSign"><span id="ayahNumber">${ayahNumber}</span>
        </a></div>`
    
    }else{
        container.innerHTML += `<div id="ayah"><a href ="#" dir="rtl" lang="ar">${ayah}
         <img src="./images/ayah.png" id="ayahSign"><span id="ayahNumber">${ayahNumber}</span>
        </a></div>`
    }
    
    ayahCounter ++;
}


const readingSurah = async (num) => {

    let response = await fetch(`http://api.alquran.cloud/v1/surah/${num}`);//?offset=${offset}&limit=1`);

    let surah = await response.json();
    // console.log(surah)

    surah.data.ayahs.forEach( (sura) => {
        buildDom(sura.text, sura.numberInSurah);
    })
}

const tafsir = async (surahNumber, ayahNumber) => {

    // console.log(surahNumber)

    let response = await fetch (`./quraanJson/${surahNumber}.json`);

    let surah = await response.json();

    // console.log(surah);

    container.innerHTML+=`<div  dir='ltr' lang='en'><a id="ayahTafsir" href="">${surah.result[ayahNumber-1].translation}</a></div><hr>`;

    // surah.data.ayahs.forEach( (sura) => {
    //     biuldDom(sura.text, sura.numberInSurah);
    // });
    


}

// tafsir('./quraanJson/${surahNumber}.json')

readingSurah(exactSurah[1]);

document.addEventListener('scroll', () => {
    const {scrollTop,scrollHeight,clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight){
        
        setTimeout( () => {
            offset++;
            readingSurah(exactSurah[1]);

        },1000);

    }
})


