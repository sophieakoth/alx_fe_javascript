// const btn = document.querySelector("#newQuote");
// const quote =document.querySelector("#quoteDisplay");
// const category = document.querySelector(".category");
// const quoteInput = document.querySelector("#newQuoteText");
// const categoryInput = document.querySelector("#newQuoteCategory");

// const quotes =[{
//    text: "Start where you are. Use what you have. Do what you can.",
//     category:"Motivation"},
// {text:"Success is not final, failure is not fatal: It is the courage to continue that counts.",
//     category:"Resilience"
// },
// {text:"Do not wait for the perfect moment. Take the moment and make it perfect.",
//     category:"Action"
// },
// {text:"The quieter you become, the more you can hear.",
//     category:"Mindfulness"
// },
// {text:"Creativity is intelligence having fun",
//     category:"Creativity"},
// {text:"Design is not just what it looks like and feels like. Design is how it works",
//     category:"Design"},
// {text:"Art enables us to find ourselves and lose ourselves at the same time",
//     category:"Art"},
// {text:"A smooth sea never made a skilled sailor",
//     category:"Growth"}

// ];
// btn.addEventListener('click',function(){
//     let random = Math.floor(Math.random()*quotes.length);

//    quote.innerText = quotes[random].text;
//    category.innerText = quotes[random].category;


// })


// Adding quotes
// const btn1 = document.querySelector("btn1");
// btn1.addEventListener("click")

// function addQuote(){
//      const newText=quoteInput.value.trim();
//      const newCategory = categoryInput.value.trim()

//      if(newText){
//         quotes.push({text:newText ,category:newCategory});
//         quoteInput.value = "";
//         categoryInput.value = "";
        
//      }else{
//        alert ("Please enter a quote ")};

// }




//  Array of quote objects
const quotes = [
   { text: "Start where you are. Use what you have. Do what you can.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Resilience" },
    { text: "Creativity is intelligence having fun.", category: "Creativity" },
    { text: "Design is not just what it looks like and feels like. Design is how it works.", category: "Design" },
     { text: "A smooth sea never made a skilled sailor.", category: "Growth" }
   ];
  
  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const categoryDisplay = document.querySelector(".category");
  const newQuoteBtn = document.getElementById("newQuote");
  
  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selected = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${selected.text}"`;
    categoryDisplay.innerHTML = `— ${selected.category}`;
  }
  
  // Function to create and handle the add-quote form
  function createAddQuoteForm() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newText = quoteInput.value.trim();
    const newCategory = categoryInput.value.trim() || "Uncategorized";
  
    if (newText) {
      quotes.push({ text: newText, category: newCategory });
      quoteInput.value = "";
      categoryInput.value = "";
      showRandomQuote(); // Optionally show the new quote
    } else {
      alert("Please enter a quote before adding.");
    }
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  