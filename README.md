1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

ANSWER: 1. getElementById() eita diye ektai element dora jay eita unique .
         syntax: document.getElementById("idname")

         <h1 id="title">Hello</h1>
         const heading = document.getElementById("title");
         heading.style.color = "red";
         eirokom dora jay
         

2. getElementsByClassName() onekgulu element eksate dorte eti use kora hoy 
        syntax: document.getElementsByClassName("card")
        eti amader html collection dey array like but array na

        example:
        <div class="card"></div>
        <div class="card"></div> 
        const cards = document.getElementsByClassName("card");
         cards[0].style.border = "1px solid red";


 3️. querySelector()  eta sudu protom match tai return kore 
     syntax:
    document.querySelector(".card")
      document.querySelector("#title")
      document.querySelector("button")   
      const btn = document.querySelector("button");
     btn.innerText = "Clicked";   
     eita kintu class dorte hole . and id dorte hole # css er moto dorte hoy

4️. querySelectorAll()   css selector er moto use korte hoy class id sobkicui dora jay and 
for each o ace eti amder nodelist dey html collection noy
syntax: document.querySelectorAll(".card")  


<!-- 2 no -->
2. How do you create and insert a new element into the DOM?
ANSWER: const div = document.createElement("div"); eirokom jekunu element bananu jay sudu div na p, a,li, button etc
div.innerText = "Ami ekta new div"; eivabe amra element er vitore content o dite pari .
div.innerHTML = "<b>Hello World</b>"; eibvave html o add korte pari 



<!-- 3 no -->
3. What is Event Bubbling? And how does it work?
event bubling mane holo event ta nicer teke upore uta 

Child e click → Parent → Grandparent → body → document eirokom
<div id="parent">
  <button id="child">Click Me</button>
</div>

document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked");
});

document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked");
});

jokon click korbo console e dekabe 

Child clicked
Parent clicked


<!-- 4 no -->
4. What is Event Delegation in JavaScript? Why is it useful?
ANSWER: Event Delegation mane holo —
👉 child element gulute alada alada event na diye, parent element e ektai event deya 
ar Event Bubbling use kore bujeneya — kun child e click hoise

<button class="btn">Btn 1</button>
<button class="btn">Btn 2</button>
<button class="btn">Btn 3</button>
10 ta button ace 
       wrong way 
             const buttons = document.querySelectorAll(".btn");

                       buttons.forEach(btn => {
               btn.addEventListener("click", () => {
                 console.log("Button clicked");
                 });
                  });
       
       
        Solution: <div id="container">
  <button class="btn">Btn 1</button>
  <button class="btn">Btn 2</button>
</div> 

           document.getElementById("container").addEventListener("click", (e) => {
           if (e.target.classList.contains("btn")) {
    console.log(e.target.innerText + " clicked");
             }
                });


<!-- 5no -->
5. What is the difference between preventDefault() and stopPropagation() methods?
ANSWER:1️. preventDefault() → default behavior bondo kore

 Browser jei natural kaj ta nije nije kore seta bondo kora
 Common default behaviors

<a> click → page onno jaygay cole jawa 

<form> submit → page reload howa

Checkbox / radio auto change howa


2️. stopPropagation() → event bubbling bondo kore
Event jeno parent / ancestor element e na jay seta bondo kore 