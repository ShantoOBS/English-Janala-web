// Cache DOM elements
const spinner = document.getElementById("sppiner");
const cardContainer = document.getElementById("cardContainer");
const lessonContainer = document.getElementById("lessonContiner");
const searchBtn = document.getElementById("button-search");
const searchInput = document.getElementById("input-search");

// Utility: fetch wrapper
async function fetchData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error("Fetch Error:", err);
    return null;
  }
}

// Spinner manager
function manageSpinner(show) {
  spinner.classList.toggle("hidden", !show);
  cardContainer.classList.toggle("hidden", show);
}

// Button highlight manager
function setActiveButton(id) {
  document.querySelectorAll(".common").forEach(ele =>
    ele.classList.remove("bg-[#422ad5]", "text-white")
  );
  document.getElementById(`button${id}`)?.classList.add("bg-[#422ad5]", "text-white");
}

// Modal
function showModalBox(data) {
  const { word, pronunciation, meaning, sentence, partsOfSpeech, synonyms = [] } = data.data;

  my_modal_1.showModal();
  const model = document.getElementById("modal_id");
  model.innerHTML = `
    <h3 class="poppins text-[2rem] font-extrabold">
      ${word} (<i class="fa-solid fa-microphone-lines"></i> : ${pronunciation})
    </h3>
    <div class="my-4">
      <p class="poppins font-semibold">Meaning</p>
      <p class="hind-siliguri-light">${meaning}</p>
    </div>
    <div>
      <p class="poppins font-semibold">Example</p>
      <p>${sentence}</p>
    </div>
    <div class="mt-4">
      <p class="poppins font-semibold">PartsOfSpeech</p>
      <p>${partsOfSpeech}</p>
    </div>
    <div class="my-4">
      <p class="hind-siliguri-light font-semibold">সমার্থক শব্দ গুলো</p>
      <div class="flex justify-start gap-2">
        ${synonyms.slice(0, 3).map(s => `<button class="btn btn-soft bg-[#edf7ff]">${s}</button>`).join("")}
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-primary">Complete Learning</button>
      </form>
    </div>
  `;
}

// Sound
function playSound(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
}

// Card Display
function displayCard(words) {
  cardContainer.innerHTML = "";

  if (!words.length) {
    cardContainer.innerHTML = `
      <div class="col-span-full flex flex-col justify-center items-center">
        <img src="assets/alert-error.png" alt="">
        <p class="hind-siliguri-light">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <p class="hind-siliguri-light text-[2rem] font-medium">নেক্সট Lesson এ যান</p>
      </div>
    `;
    manageSpinner(false);
    return;
  }

  words.forEach(({ id, word, meaning, pronunciation }) => {
    const ele = document.createElement("div");
    ele.innerHTML = `
      <div class="bg-white p-10 rounded-md">
        <p class="text-[2rem] font-extrabold hind-siliguri-light">${word}</p>
        <p class="py-2">Meaning / Pronunciation</p>
        <p class="text-[2rem] font-semibold hind-siliguri-light">"${meaning} / ${pronunciation}"</p>
        <div class="flex justify-between items-center mt-8">
          <button onclick="circleButton(${id})" class="btn btn-soft bg-[#edf7ff]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="soundButton(${id})" class="btn btn-soft bg-[#edf7ff]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    cardContainer.appendChild(ele);
  });

  manageSpinner(false);
}

// Lesson Buttons
function displayLessons(levels) {
  levels.forEach(({ level_no }) => {
    const ele = document.createElement("div");
    ele.innerHTML = `
      <button id="button${level_no}" onclick="buttonClick(${level_no})" 
        class="common btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${level_no}
      </button>
    `;
    lessonContainer.appendChild(ele);
  });
}

// Main Functions
async function circleButton(id) {
  const data = await fetchData(`https://openapi.programming-hero.com/api/word/${id}`);
  if (data) showModalBox(data);
}

async function soundButton(id) {
  const data = await fetchData(`https://openapi.programming-hero.com/api/word/${id}`);
  if (data) playSound(data.data.word);
}

async function buttonClick(id) {
  manageSpinner(true);
  setActiveButton(id);
  cardContainer.innerHTML = "";
  const data = await fetchData(`https://openapi.programming-hero.com/api/level/${id}`);
  if (data) displayCard(data.data);
}

async function getLesson() {
  const data = await fetchData("https://openapi.programming-hero.com/api/levels/all");
  if (data) displayLessons(data.data);
}

async function searchWords() {
  const str = searchInput.value.trim().toLowerCase();
  if (!str) return;

  manageSpinner(true);
  const data = await fetchData("https://openapi.programming-hero.com/api/words/all");
  if (data) {
    const results = data.data.filter(w => w.word.toLowerCase().includes(str));
    displayCard(results);
  }
}

// Init
getLesson();
searchBtn.addEventListener("click", searchWords);
