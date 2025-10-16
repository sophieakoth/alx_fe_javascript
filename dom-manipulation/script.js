const btn = document.querySelector("#newQuote");
const quote =document.querySelector("#quoteDisplay");
const category = document.querySelector(".category");
const quoteInput = document.querySelector("#newQuoteText");
const categoryInput = document.querySelector("#newQuoteCategory");

const quotes =[{
   quote: "Start where you are. Use what you have. Do what you can.",
    category:"Motivation"},
{quote:"Success is not final, failure is not fatal: It is the courage to continue that counts.",
    category:"Resilience"
},
{quote:"Do not wait for the perfect moment. Take the moment and make it perfect.",
    category:"Action"
},
{quote:"The quieter you become, the more you can hear.",
    category:"Mindfulness"
},
{quote:"Creativity is intelligence having fun",
    category:"Creativity"},
{quote:"Design is not just what it looks like and feels like. Design is how it works",
    category:"Design"},
{quote:"Art enables us to find ourselves and lose ourselves at the same time",
    category:"Art"},
{quote:"A smooth sea never made a skilled sailor",
    category:"Growth"}

];
btn.addEventListener('click',function(){
    let random = Math.floor(Math.random()*quotes.length);

   quote.innerText = quotes[random].quote;
   category.innerText = quotes[random].category;


})


// Adding quotes
// const btn1 = document.querySelector("btn1");
// btn1.addEventListener("click")

function addQuote(){
     const newText=quoteInput.value.trim();
     const newCategory = categoryInput.value.trim()

     if(newText){
        quotes.push({quote:newText ,category:newCategory});
        quoteInput.value = "";
        categoryInput.value = "";
        
     }else{
       alert ("Please enter a quote")};
}