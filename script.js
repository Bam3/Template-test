const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//Hide Loading
function complite() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
//Show New Quote
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check for autho
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check the quote length to determine style
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //Set Quote and Hide Loader
  quoteText.textContent = quote.text;
  complite();
}

// Get Quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //Catch errors
  }
}

//tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// On Load
getQuotes();

// Event Listeners
//New Quote Btn
newQuoteBtn.addEventListener("click", (e) => {
  newQuote();
});
// Tweet Quote
twitterBtn.addEventListener("click", tweetQuote);
