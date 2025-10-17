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


      //Save updated quotes
      saveQuotes();

      //Refresh category dropdown
      populateCategories();


      //save to local storage
      // localStorage.setItem("quotes",JSON.stringify(quotes));
      quoteInput.value = "";
      categoryInput.value = "";
      showRandomQuote(); // Optionally show the new quote
    } else {
      alert("Please enter a quote before adding.");
    }

    postQuoteToServer({ text: newText, category: newCategory });
  }
  
  // Event listeners
  newQuoteBtn.addEventListener("click", showRandomQuote);

//Export and import part

function saveQuotes(){
  localStorage.setItem("quotes",JSON.stringify(quotes));

  //Also save current filter

  const selectedCategory = document.getElementById("categoryFilter")?.value;
  if(selectedCategory){
    localStorage.setItem("selectedCategory",selectedCategory);
  }
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
  populateCategories();
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


//Dynamic content filtering system
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");

  // Create a Set of unique categories
  const categorySet = new Set(quotes.map(q => q.category));

  // Clear existing options except "All"
  dropdown.innerHTML = '<option value="all">All Categories</option>';

  // Add each unique category as an option
  categorySet.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    dropdown.appendChild(option);
  });

  const savedCategory = localStorage.getItem("selectedCategory");
  if(savedCategory) {
    dropdown.value = savedCategory;
    filterQuotes();
  }
}


// Filterfuncton

function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;


  //Save selected filter to laocal storage
  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filtered.length === 0) {
    quoteDisplay.innerHTML = "No quotes found for this category.";
    categoryDisplay.innerHTML = "";
    return;
  }

  const selected = filtered[Math.floor(Math.random() * filtered.length)];

  quoteDisplay.innerHTML = "";
  categoryDisplay.innerHTML = "";

  const quoteText = document.createElement("p");
  quoteText.textContent = `"${selected.text}"`;

  const categoryText = document.createElement("span");
  categoryText.textContent = `-${selected.category}`;

  quoteDisplay.appendChild(quoteText);
  categoryDisplay.appendChild(categoryText);
}


// Syncing Data with Server and Implementing Conflict Resolution

async function fetchQuotesFromServer() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await response.json();

    console.log("Fetched data from mock API:", data);

    const serverQuotes = data.map(post => ({
      text: post.title,
      category: "Server"
    }));

    const conflicts = serverQuotes.filter(sq =>
      !quotes.some(lq => lq.text === sq.text)
    );

    if (conflicts.length > 0) {
      showConflictNotification(conflicts);
    }

    quotes.push(...serverQuotes);
    saveQuotes();
    populateCategories();
    filterQuotes();
  } catch (error) {
    console.error("Error fetching mock data:", error);
  }
}


//Simulate posting a new quote
async function postQuoteToServer(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: quote.text,
        body: quote.category,
        userId: 1
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      }
    });

    const result = await response.json();
    console.log("Posted quote to mock API:", result);
  } catch (error) {
    console.error("Error posting quote to server:", error);
  }
}


async function syncQuotes() {
  console.log("Starting sync with mock API...");

  await fetchQuotesFromServer(); // Pull new quotes
  // Optionally: push local quotes to server
  for (const quote of quotes) {
    await postQuoteToServer(quote);
  }

  console.log("Quotes synced with server");
}




//show notification when conflicts are found
function showConflictNotification(conflicts) {
  window.pendingConflicts = conflicts; // store for manual resolution
  document.getElementById("conflictNotice").style.display = "block";
}

// Manual conflict Resolution

function resolveConflicts() {
  if (!window.pendingConflicts) return;

  // Merge conflicts into local quotes
  quotes.push(...window.pendingConflicts);
  saveQuotes();
  populateCategories();
  filterQuotes();

  // Clear notification
  document.getElementById("conflictNotice").style.display = "none";
  window.pendingConflicts = null;
  alert("Conflicts resolved and quotes merged.");
}









 
  



 









setInterval(fetchQuotesFromServer, 30000); // every 30 seconds
populateCategories();
filterQuotes();
fetchQuotesFromServer(); // Initial fetch
