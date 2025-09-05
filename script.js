function CurrentButton(id) {

      const arr = document.querySelectorAll(".common");

      arr.forEach(ele => {

            ele.classList.remove("bg-[#422ad5]", "text-white");

      });

      document.getElementById(`button${id}`).classList.add("bg-[#422ad5]", "text-white");

      console.log(arr);
}

function model_box(data) {

      my_modal_1.showModal()

      const model = document.getElementById("modal_id");

      model.innerHTML = "";
      const div = document.createElement("div");
      div.innerHTML = `
           
      <h3 class="poppins text-[2rem] font-extrabold">${data.data.word}(<i class="fa-solid fa-microphone-lines"></i> :
                    ${data.data.pronunciation})</h3>

                <div class="my-4">
                    <p class="poppins font-semibold">Meaning</p>
                    <p class="hind-siliguri-light">${data.data.meaning}</p>
                </div>   
                <div>
                    <p class="poppins font-semibold">Example</p>
                    <p>${data.data.sentence}</p>
                </div>
                  <div class="mt-4">
                    <p class="poppins font-semibold">PartsOfSpeech</p>
                    <p>${data.data.partsOfSpeech}</p>
                </div>
                <div class="my-4">
                    <p class="hind-siliguri-light font-semibold">সমার্থক শব্দ গুলো</p>

                    <div class="flex justify-start gap-2 ">
                        <button class="btn btn-soft bg-[#edf7ff]">${data.data.synonyms[0]}</button>
                       <button class="btn btn-soft bg-[#edf7ff]">${data.data.synonyms[1]}</button>
                       <button class="btn btn-soft bg-[#edf7ff]">${data.data.synonyms[2]}</button>
                    </div>

                </div>


                <div class="modal-action">
                    <form method="dialog">
                        <!-- if there is a button in form, it will close the modal -->
                        <button class="btn btn-primary">Complete Learning</button>
                    </form>
                </div>
          
        `

      model.appendChild(div);

}


function circleButton(id) {

      const url = `https://openapi.programming-hero.com/api/word/${id}`;

      fetch(url)
            .then(res => res.json())
            .then(data => model_box(data))
            .catch(err => console.error("Error:", err));


}

function soundNo(data) {

      const word = data.data.word;

      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-EN"; // English
      window.speechSynthesis.speak(utterance);
}
function soundButton(id) {

      const url = `https://openapi.programming-hero.com/api/word/${id}`;

      fetch(url)
            .then(res => res.json())
            .then(data => soundNo(data))
            .catch(err => console.error("Error:", err));
}

function displayCard(e) {



      const cardContainer = document.getElementById("cardContainer");

      cardContainer.innerHTML = "";

      if (e.data.length === 0) {



            cardContainer.innerHTML = `
               
         
             <div class=" col-span-full flex flex-col justify-center items-center ">
                <img src="assets/alert-error.png" alt="">
                <p class="hind-siliguri-light">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <p class="hind-siliguri-light text-[2rem] font-medium">নেক্সট Lesson এ যান</p>
              </div>
              
             
             `;




      }
      else {

            e.data.forEach(element => {



                  const ele = document.createElement("div");

                  ele.innerHTML = `
               
               <div class="bg-white p-10 rounded-md">
                  <p class="text-[2rem] font-extrabold hind-siliguri-light">${element.word}</p>
                  <p class="py-2">Meaning / Pronounciation</p>
                  <p class="text-[2rem] font-semibold hind-siliguri-light">"${element.meaning}/ ${element.pronunciation}"</p>
                  <div class="flex justify-between items-center mt-8">
                    <button onclick="circleButton(${element.id})"  class="btn btn-soft bg-[#edf7ff]"><i class="fa-solid fa-circle-info"></i></button>
                    <button  onclick="soundButton(${element.id})" class="btn btn-soft bg-[#edf7ff]"><i class="fa-solid fa-volume-high"></i></button>
                  </div>
               </div>
              
              `;

                  cardContainer.appendChild(ele);
            });

      }


}



function buttonClick(id) {

      CurrentButton(id);

      const cardContainer = document.getElementById("cardContainer");

      cardContainer.innerHTML = "";

      const url = `https://openapi.programming-hero.com/api/level/${id}`;

      fetch(url)
            .then(res => res.json())
            .then(data => displayCard(data))
            .catch(err => console.error("Error:", err));

}
function display(e) {
      const lessonContiner = document.getElementById("lessonContiner");
      e.forEach(element => {
            const ele = document.createElement("div");
            ele.innerHTML = `
                <button id="button${element.level_no}"  onclick="buttonClick(${element.level_no})" class="common btn btn-outline btn-primary "><i class="fa-solid fa-book-open"></i>
                        Lesson -${element.level_no}</button>
            `;
            lessonContiner.appendChild(ele);

      });
}

function getLesson() {
      fetch("https://openapi.programming-hero.com/api/levels/all")
            .then(res => res.json())
            .then(data => display(data.data))
            .catch(err => console.error("Error:", err));
}

getLesson();