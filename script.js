// Import the fetchData function from the httpReq.js file
import { fetchData } from "./utils/httpReq.js";

// Get the DOM elements
const resultElem = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const input = document.getElementById("inp-word");
let audioSrc = new Audio(); // Changed to create a new Audio object

// Create a button element for playing sound
let btn = document.createElement("button");
btn.classList.add("btn");
btn.innerHTML = `<i class="fas fa-volume-up"></i>`;

// Function to play sound
const playSound = (words, phoneticIndex) => {
  // اگر phoneticIndex معتبر نیست، از مقدار پیش‌فرض 0 استفاده می‌کنیم
  let validIndex =
    phoneticIndex >= 0 && phoneticIndex <= words[0].phonetics.length
      ? phoneticIndex
      : 0;
  audioSrc.src = words[0].phonetics[validIndex].audio; // تنظیم منبع صوتی با استفاده از ایندکس معتبر
  resultElem.appendChild(btn); // اضافه کردن دکمه به المنت نتیجه
  btn.onclick = () => audioSrc.play(); // اضافه کردن رویداد کلیک برای پخش صوت
};

// Function to display words and their details
function displayWords(words) {
  resultElem.innerHTML = ""; // Clear the result element
  words.forEach((i) => {
    const jsx = `
      <div class="word">
        <h3>${i.word}</h3>
      </div>
      <div class="details">
        <p>${i.meanings[0].partOfSpeech}</p>
        <p>${i.phonetics[0].text} </p> 
      </div>
      <p class="word-meaning">
        ${i.meanings[0].definitions[0].definition} 
      </p>
      <p class="word-example">
        ${i.meanings[0].definitions[0].example || ""}
      </p>
    `;
    resultElem.innerHTML += jsx;
  });
}

// Handler for the search button click event
const searchHandler = async () => {
  const inputValue = input.value;
  let response = await fetchData(inputValue);
  console.log(response);
  displayWords(response);
  playSound(response, 2); // Assuming the audio URL is in the first phonetic object
};

// Add event listener to the search button
searchBtn.addEventListener("click", searchHandler);