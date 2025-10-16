//Defining quotes




//  Array of quote objects
//load quotes from local storage if available

let quotes =[]; //will be loaded from localStorage or start empty
const saved = localStorage.getItem("quotes");

if(saved){
  quotes = JSON.parse(saved);
}else{
quotes = [
   { text: "Start where you are. Use what you have. Do what you can.", category: "Motivation" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Resilience" },
    { text: "Creativity is intelligence having fun.", category: "Creativity" },
    { text: "Design is not just what it looks like and feels like. Design is how it works.", category: "Design" },
     { text: "A smooth sea never made a skilled sailor.", category: "Growth" }
   ];

  }
  
  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const categoryDisplay = document.querySelector(".category");
  const newQuoteBtn = document.getElementById("newQuote");
  
  // Function to show a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selected = quotes[randomIndex];

    // Clear previous content
    quoteDisplay.innerHTML = "";
    categoryDisplay.innerHTML = "";

    //create new elements

    const quoteText =document.createElement("p");
    quoteText.textContent = `"${selected.text}"`;

    const categoryText = document.createElement("span");
    categoryText.textContent = `-${selected.category}`;

    // Append to containers

    quoteDisplay.appendChild(quoteText);
    categoryDisplay.appendChild(categoryText);

  }
  
  // Function to create and handle the add-quote form
  function createAddQuoteForm() {
    const quoteInput = document.getElementById("newQuoteText");
    const categoryInput = document.getElementById("newQuoteCategory");
  
    const newText = quoteInput.value.trim();
    const newCategory = categoryInput.value.trim() || "Uncategorized";
  
    if (newText) {
      quotes.push({ text: newText, category: newCategory });

      //save to local storage
      localStorage.setItem("quotes",JSON.stringify(quotes));
      quoteInput.value = "";
      categoryInput.value = "";
      showRandomQuote(); // Optionally show the new quote
    } else {
      alert("Please enter a quote before adding.");
    }
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);

//Export and import part

function saveQuotes(){
  localStorage.setItem("quotes",JSON.stringify(quotes));
}


// import Function

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
      } else {
        alert('Invalid file format. Expected an array of quote objects.');
      }
    } catch (err) {
      alert('Error reading file: ' + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}


// Export Quotes Button
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}





 
  



  