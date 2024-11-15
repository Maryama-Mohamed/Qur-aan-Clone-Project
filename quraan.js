let container = document.querySelector(".container");

let loader = document.getElementById("loader");

const buildDom = (surahArabic, surahEnglish, surahNumber) => {
  container.innerHTML += `<div class="surah-info">
            <div class="surah-names">
             <a href="http://127.0.0.1:5500/tafsiir.html?id=${surahNumber}" id="surah-eng">${surahEnglish}</a>
             <a href="http://127.0.0.1:5500/tafsiir.html?id=${surahNumber}" id="surah-ar">${surahArabic}</a>
            </div>
            <span id="ayah-number">${surahNumber}</span>
        </div>
        `;
};

const serachSurah = (e) => {
  let surahInfo = document.querySelectorAll(".surah-info");
  let term = e.target.value;
//   console.log(term);

  surahInfo.forEach((surah) => {
    let surahEng = surah.querySelector("#surah-eng").innerHTML.toUpperCase();
    let surahAr = surah.querySelector("#surah-ar").innerHTML.toUpperCase();

    if (surahEng.indexOf(term) > -1 || surahAr.indexOf(term) > -1) {
      surah.style.display = "flex";
    } else {
      surah.style.display = "none";
    }
  });
};

const getAllSurah = async () => {

    loader.style.display = "block";

  let response = await fetch("http://api.alquran.cloud/v1/quran/quran-uthmani");

  let surah = await response.json();

 
  // console.log(surah.data);
  loader.style.display = "none";
  surah.data.surahs.forEach((sura) => {
    // console.log(sura);

    buildDom(sura.name, sura.englishName, sura.number);
  });
};

getAllSurah();

document.addEventListener("input", serachSurah);
