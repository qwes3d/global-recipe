export function initFlagGuessingGame(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Create game UI
  const gameUI = `
    <h3>Flag Guessing Game</h3>
    <div class="flag-container">
      <img id="flagImage" alt="Country flag to guess">
      <div class="loading">Loading flag...</div>
    </div>
    <div class="input-group">
      <input type="text" id="countryGuess" placeholder="Guess the country...">
      <button id="submitGuess">Submit</button>
      <button id="skipFlag">Skip</button>
    </div>
    <p id="result"></p>
  `;
  container.innerHTML = gameUI;

  const flagImg = container.querySelector('#flagImage');
  const input = container.querySelector('#countryGuess');
  const submitBtn = container.querySelector('#submitGuess');
  const skipBtn = container.querySelector('#skipFlag');
  const result = container.querySelector('#result');
  const loading = container.querySelector('.loading');

  let countriesData = [];
  let correctCountry = "";

  async function loadCountries() {
    try {
      loading.style.display = 'block';
      flagImg.style.display = 'none';
     const res = await fetch("https://restcountries.com/v3.1/all?fields=name,flags"); if (!res.ok) throw new Error("Failed to fetch countries");
      
      countriesData = await res.json();
      loadRandomFlag();
    } catch (error) {
      result.textContent = "Error loading flags. Please try again later.";
      console.error(error);
    } finally {
      loading.style.display = 'none';
    }
  }

  function loadRandomFlag() {
    if (!countriesData.length) return;
    
    const randomCountry = countriesData[Math.floor(Math.random() * countriesData.length)];
    flagImg.src = randomCountry.flags.svg;
    flagImg.alt = `Flag of ${randomCountry.name.common}`;
    correctCountry = randomCountry.name.common;
    flagImg.style.display = 'block';
    input.focus();
  }

  function checkGuess() {
    const guess = input.value.trim().toLowerCase();
    const normalizedCorrect = correctCountry.toLowerCase();
    
    if (!guess) {
      result.textContent = "Please enter a guess";
      return;
    }

    if (guess === normalizedCorrect) {
      result.textContent = "Correct! 🎉";
    } else {
      result.textContent = `Oops! It was ${correctCountry}`;
    }
    
    input.value = "";
    setTimeout(loadRandomFlag, 2000);
  }

  submitBtn.addEventListener('click', checkGuess);
  skipBtn.addEventListener('click', loadRandomFlag);
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
  });

  loadCountries();
}