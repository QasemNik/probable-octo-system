import { fetchData } from "./utils/httpReq.js";

const resultElem = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const input = document.querySelector("#inp-word");
const audio = document.querySelector("#sound");

function displayWords(words) {
  resultElem.innerHTML = "";
  words.forEach((i) => {
    const jsx = `
            <div class="word">
                <h3>${i.word}</h3>
                <button onclick="playSound()">
                <i class="fas fa-volume-up"></i>
            </button>
            </div>
            <div class="details">
                <p>${i.meanings[0].partOfSpeech}</p>
                <p>${i.phonetics[1].text}</p>
            </div>
            <p class="word-meaning">
                ${i.meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${i.meanings[0].definitions[0].example || ""}
            </p>
        `;
    audio.src = i.phonetics[0].audio;
    resultElem.innerHTML += jsx;
  });
}

function playSound() {
  audio.play();
}

const searchHandler = async () => {
  const inputValue = input.value;
  let response = await fetchData(inputValue);
  displayWords(response);
};

searchBtn.addEventListener("click", searchHandler);
