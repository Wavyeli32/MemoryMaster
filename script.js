document.addEventListener("DOMContentLoaded", () => {
    const allPairs = {
      "Alabama": "Montgomery",
      "Alaska": "Juneau",
      "Arizona": "Phoenix",
      "Arkansas": "Little Rock",
      "California": "Sacramento",
      "Colorado": "Denver",
      "Connecticut": "Hartford",
      "Delaware": "Dover",
      "Florida": "Tallahassee",
      "Georgia": "Atlanta",
      "Hawaii": "Honolulu",
      "Idaho": "Boise",
      "Illinois": "Springfield",
      "Indiana": "Indianapolis",
      "Iowa": "Des Moines",
      "Kansas": "Topeka",
      "Kentucky": "Frankfort",
      "Louisiana": "Baton Rouge",
      "Maine": "Augusta",
      "Maryland": "Annapolis",
      "Massachusetts": "Boston",
      "Michigan": "Lansing",
      "Minnesota": "Saint Paul",
      "Mississippi": "Jackson",
      "Missouri": "Jefferson City",
      "Montana": "Helena",
      "Nebraska": "Lincoln",
      "Nevada": "Carson City",
      "New Hampshire": "Concord",
      "New Jersey": "Trenton",
      "New Mexico": "Santa Fe",
      "New York": "Albany",
      "North Carolina": "Raleigh",
      "North Dakota": "Bismarck",
      "Ohio": "Columbus",
      "Oklahoma": "Oklahoma City",
      "Oregon": "Salem",
      "Pennsylvania": "Harrisburg",
      "Rhode Island": "Providence",
      "South Carolina": "Columbia",
      "South Dakota": "Pierre",
      "Tennessee": "Nashville",
      "Texas": "Austin",
      "Utah": "Salt Lake City",
      "Vermont": "Montpelier",
      "Virginia": "Richmond",
      "Washington": "Olympia",
      "West Virginia": "Charleston",
      "Wisconsin": "Madison",
      "Wyoming": "Cheyenne"
    }; // Full set of state-capital pairs
  
    let firstCard = null;
    let secondCard = null;
    let matchedPairs = 0;
    let currentLevel = 1; // Start at level 1
  
    const cards = document.querySelectorAll(".card");
  
    // Shuffle an array
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    // Randomize card values for the current level
    function setupCards() {
      const states = Object.keys(allPairs);
      const capitals = Object.values(allPairs);
  
      // Extract random pairs equal to the number of cards divided by 2
      const numPairs = cards.length / 2;
      const selectedPairs = [];
  
      // Randomly select state-capital pairs for the level
      while (selectedPairs.length < numPairs * 2) { 
        const randomIndex = Math.floor(Math.random() * states.length);
        const state = states[randomIndex];
        const capital = allPairs[state]; // Get the corresponding capital for the state
  
        // Add state and capital to the selected pairs if not already added
        if (!selectedPairs.includes(state) && !selectedPairs.includes(capital)) {
          selectedPairs.push(state, capital); // Add state and its capital
        }
      }
  
      // Shuffle the selected pairs
      shuffle(selectedPairs);
  
      // Assign randomized values to cards
      cards.forEach((card, index) => {
        card.dataset.value = selectedPairs[index];
        card.textContent = "?"; // Hide card values
        card.classList.remove("matched", "correct", "wrong"); // Reset card states
        card.addEventListener("click", handleCardClick);
      });
    }
  
    // Handle card click
    function handleCardClick(e) {
      const clickedCard = e.target;
  
      // Prevent clicking the same card twice or clicking more than two cards
      if (clickedCard === firstCard || clickedCard.classList.contains("matched") || secondCard) return;
  
      clickedCard.textContent = clickedCard.dataset.value; // Reveal card value
  
      if (!firstCard) {
        firstCard = clickedCard; // Set the first card
      } else {
        secondCard = clickedCard; // Set the second card
        checkMatch();
      }
    }
  
    // Check if the cards match
    function checkMatch() {
      const isMatch =
        allPairs[firstCard.dataset.value] === secondCard.dataset.value ||
        allPairs[secondCard.dataset.value] === firstCard.dataset.value;
  
      if (isMatch) {
        // Match found
        firstCard.classList.add("matched", "correct");
        secondCard.classList.add("matched", "correct");
        matchedPairs++;
  
        resetCards();
  
        // Initialize currentLevel
let currentLevel = parseInt(localStorage.getItem("currentLevel")) || 1;

// Game logic
if (matchedPairs === cards.length / 2) {
  setTimeout(() => {
    alert(`Congratulations! Moving to Level ${currentLevel + 1}!`);
    
    // Increment and store the updated level
    currentLevel++;
    localStorage.setItem("currentLevel", currentLevel);

    // Redirect to the next level
    if (currentLevel <= 10) {
      window.location.href = `classic${currentLevel}.html`;
    } else {
      alert("You've completed all levels!");
      localStorage.removeItem("currentLevel"); // Clear the level progress
    }
  }, 500);
}
      }

        else {
        // No match
        firstCard.classList.add("wrong");
        secondCard.classList.add("wrong");
        setTimeout(() => {
          firstCard.textContent = "?";
          secondCard.textContent = "?";
          firstCard.classList.remove("wrong");
          secondCard.classList.remove("wrong");
          resetCards();
        }, 1000);
      }
    }
  
    // Reset selected cards
    function resetCards() {
      firstCard = null;
      secondCard = null;
    }
  
    // Initialize the game for the current level
    setupCards();
  });
  