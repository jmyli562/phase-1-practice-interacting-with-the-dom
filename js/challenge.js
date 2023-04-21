const button = document.getElementById("pause");
const form = document.getElementById("comment-form");
let isTimerStarted;
let resume = "";
const counter = document.getElementById("counter");
const minus = document.getElementById("minus");
const plus = document.getElementById("plus");
const like = document.getElementById("heart");

let numbrArray = [];

let minusClicked;
let plusClicked;

let intervalID;
let counterValue = parseInt(document.getElementById("counter").textContent);
let newValue;
document.addEventListener("DOMContentLoaded", ()=>{
    form.addEventListener("submit", handleFormSubmit);
    button.addEventListener("click", toggleTimer);
    like.addEventListener("click", displayLikedNumber);
    minus.addEventListener("click", decrementCounter);
    plus.addEventListener("click", incrementCounter);
    //main timer
    startCounter();
})

function handleFormSubmit(e){
    e.preventDefault();
    const input = e.target.children[0].value;
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    li.textContent = input;
    
    ul.appendChild(li);
    div.appendChild(ul);
    form.appendChild(div);

    form.reset();
}

function toggleTimer(){
    if(isTimerStarted){
        pauseTimer();
    }else{
        resumeTimer();
    }
}

function displayLikedNumber(){

    //do a check at the beginning to see if the number exists in our array
    //if it does increment the number of likes. else create new object
    const likes = document.getElementsByClassName("likes")[0];
    const li = document.createElement("li");
    const p = document.createElement("p");
    const span = document.createElement("span");

    if(isInArray(counterValue)){

        let numLikes = updateAndReturnLikes(counterValue);
        const id = document.getElementById(`num-likes${counterValue}`);
        id.textContent = numLikes + " times.";

    }else{
        const numbrObj = {}
        numbrObj.number = counterValue;
        numbrObj.likes = 0;
        numbrArray.push(numbrObj)

        span.textContent = numbrObj.likes + " times.";
        span.id = `num-likes${counterValue}`;
        p.textContent = `You liked ${counterValue}: `;
        p.appendChild(span);
        li.appendChild(p);
        likes.appendChild(li);
    }
    //iterate through array and assign value
}

function isInArray(number){
    let found;
    for(num of numbrArray){
        if(num.number === number){
            found = true;
        }else{
            found = false;
        }
    }

    return found;
}

function updateAndReturnLikes(number){
    for(num of numbrArray){
        if(num.number === number){
            num.likes += 1;
        }
    }
    return num.likes;
}

function pauseTimer(){

    clearInterval(intervalID);
    intervalID = null;
    pause.textContent = "resume";

    minus.disabled = true;
    plus.disabled = true;
    like.disabled = true;

    isTimerStarted = false;

}

function resumeTimer(){

    pause.textContent = "pause";

    minus.disabled = false;
    plus.disabled = false;
    like.disabled = false;

    startCounter();
}

function incrementCounter(){
    counterValue += 1;
    counter.textContent = counterValue;
}

function decrementCounter(){
    counterValue -= 1;
    counter.textContent = counterValue;
}

function startCounter(){
    isTimerStarted = true;
    intervalID = setInterval(()=>{
        counterValue += 1;
        counter.textContent = counterValue;
    },1000);
}