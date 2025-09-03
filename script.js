console.log("hereere");

function displayCard(e){

       const cardContainer=document.getElementById("cardContainer");

       e.data.forEach(element => {
           
             const ele=document.createElement("div");

             ele.innerHTML=`
               
               <div class="bg-white p-10 rounded-md">
                  <p class="text-[2rem] font-extrabold hind-siliguri-light">${element.word}</p>
                  <p class="py-2">Meaning / Pronounciation</p>
                  <p class="text-[2rem] font-semibold hind-siliguri-light">"${element.meaning}/ ${element.pronunciation}"</p>

                  <div class="flex justify-between items-center mt-8">
                    <button class="btn btn-soft"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn btn-soft"><i class="fa-solid fa-volume-high"></i></button>
                  </div>
            </div>
              
             
             `;

             cardContainer.appendChild(ele);
       });
}

 function  buttonClick(id){
      const cardContainer=document.getElementById("cardContainer");

      cardContainer.innerHTML="";

      const url=`https://openapi.programming-hero.com/api/level/${id}`;

       fetch(url)
      .then(res=>res.json())
      .then(data=> displayCard(data))
      .catch(err => console.error("Error:", err));
      
}
function display(e){
     const lessonContiner=document.getElementById("lessonContiner");
     e.forEach(element => {
            const ele=document.createElement("div");
            ele.innerHTML=`
                <button onclick="buttonClick(${element.level_no})" class="btn btn-outline btn-primary "><i class="fa-solid fa-book-open"></i>
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