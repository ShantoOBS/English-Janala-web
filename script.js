console.log("hereere");


function display(e){
     const lessonContiner=document.getElementById("lessonContiner")
      console.log(e) ;
     e.forEach(element => {

            const ele=document.createElement("div");
            ele.innerHTML=`
                <button class="btn btn-outline btn-primary "><i class="fa-solid fa-book-open"></i>
                        Lesson -${element.level_no}</button>
            `
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