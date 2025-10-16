
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
      quoteInput.value = "";
      categoryInput.value = "";
      showRandomQuote(); // Optionally show the new quote
    } else {
      alert("Please enter a quote before adding.");
    }
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);
  