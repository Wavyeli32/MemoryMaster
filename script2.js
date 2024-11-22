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
  };

  let firstCard = null;
  let secondCard = null;
  let matchedPairs = 0;
  let currentLevel = parseInt(localStorage.getItem("currentLevel")) || 1;
  let score = parseInt(localStorage.getItem("score")) || 0;
  let timeLeft = calculateTimeLeft(currentLevel);
  let timer;

  const cards = document.querySelectorAll(".card");
  const scoreDisplay = document.querySelector("#score");
  const timerDisplay = document.querySelector("#timer");

  function calculateTimeLeft(level) {
    const initialTime = 150; 
    const timeReductionPerLevel = 10; 
    return Math.max(initialTime - (level - 1) * timeReductionPerLevel, 30); 
  }

  function updateScoreDisplay() {
    if (scoreDisplay) {
      scoreDisplay.textContent = `Score: ${score}`;
    }
  }

  function updateTimerDisplay() {
    if (timerDisplay) {
      timerDisplay.textContent = `Time: ${timeLeft}s`;
    }
  }

  function startTimer() {
    updateTimerDisplay();
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        endGame("Time's up! Try again.");
      }
    }, 1000);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function setupCards() {
    const states = Object.keys(allPairs);
    const capitals = Object.values(allPairs);
    const numPairs = cards.length / 2;
    const selectedPairs = [];

    while (selectedPairs.length < numPairs * 2) {
      const randomIndex = Math.floor(Math.random() * states.length);
      const state = states[randomIndex];
      const capital = allPairs[state];
      if (!selectedPairs.includes(state) && !selectedPairs.includes(capital)) {
        selectedPairs.push(state, capital);
      }
    }

    shuffle(selectedPairs);

    cards.forEach((card, index) => {
      card.dataset.value = selectedPairs[index];
      card.textContent = "?";
      card.classList.remove("matched", "correct", "wrong");
      card.addEventListener("click", handleCardClick);
    });
  }

  function handleCardClick(e) {
    const clickedCard = e.target;
    if (clickedCard === firstCard || clickedCard.classList.contains("matched") || secondCard) return;

    clickedCard.textContent = clickedCard.dataset.value;

    if (!firstCard) {
      firstCard = clickedCard;
    } else {
      secondCard = clickedCard;
      checkMatch();
    }
  }

  function checkMatch() {
    const isMatch =
      allPairs[firstCard.dataset.value] === secondCard.dataset.value ||
      allPairs[secondCard.dataset.value] === firstCard.dataset.value;

    if (isMatch) {
      firstCard.classList.add("matched", "correct");
      secondCard.classList.add("matched", "correct");
      matchedPairs++;
      score += 10;
      localStorage.setItem("score", score);
      updateScoreDisplay();

      resetCards();

      if (matchedPairs === cards.length / 2) {
        clearInterval(timer);
        setTimeout(() => {
          alert(`Level ${currentLevel} completed!`);
          currentLevel++;
          localStorage.setItem("currentLevel", currentLevel);
          timeLeft = calculateTimeLeft(currentLevel); 
          window.location.href = `time-trial${currentLevel}.html`;
        }, 500);
      }
    } else {
      firstCard.classList.add("wrong");
      secondCard.classList.add("wrong");
      setTimeout(() => {
        firstCard.textContent = "?";
        secondCard.textContent = "?";
        firstCard.classList.remove("wrong");
        secondCard.classList.remove("wrong");
        resetCards();
      }, 1000);
      score -= 5;
      localStorage.setItem("score", score);
      updateScoreDisplay();
    }
  }

  function resetCards() {
    firstCard = null;
    secondCard = null;
  }

  function endGame(message) {
    clearInterval(timer);
    alert(`${message} Final Score: ${score}`);
    localStorage.setItem("currentLevel", 1);
    localStorage.setItem("score", 0);
    window.location.href = "score.html"; 
  }

  updateScoreDisplay();
  setupCards();
  startTimer();
});
