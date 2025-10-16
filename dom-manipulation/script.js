const btn = document.querySelector("#newQuote");
const quote =document.querySelector("#quoteDisplay");
const category = document.querySelector(".category");
const quoteInput = document.querySelector("#newQuoteText");
const categoryInput = document.querySelector("#newQuoteCategory");

const quotes =[{
   text: "Start where you are. Use what you have. Do what you can.",
    category:"Motivation"},
{text:"Success is not final, failure is not fatal: It is the courage to continue that counts.",
    category:"Resilience"
},
{text:"Do not wait for the perfect moment. Take the moment and make it perfect.",
    category:"Action"
},
{text:"The quieter you become, the more you can hear.",
    category:"Mindfulness"
},
{text:"Creativity is intelligence having fun",
    category:"Creativity"},
{text:"Design is not just what it looks like and feels like. Design is how it works",
    category:"Design"},
{text:"Art enables us to find ourselves and lose ourselves at the same time",
    category:"Art"},
{text:"A smooth sea never made a skilled sailor",
    category:"Growth"}

];
btn.addEventListener('click',function(){
    let random = Math.floor(Math.random()*quotes.length);

   quote.innerText = quotes[random].text;
   category.innerText = quotes[random].category;


})


// Adding quotes
// const btn1 = document.querySelector("btn1");
// btn1.addEventListener("click")

function addQuote(){
     const newText=quoteInput.value.trim();
     const newCategory = categoryInput.value.trim()

     if(newText){
        quotes.push({text:newText ,category:newCategory});
        quoteInput.value = "";
        categoryInput.value = "";
        
     }else{
       alert ("Please enter a quote ")};
}