const games = [
  {
    name: "Discover a Country",
    description: "Guess the country based on clues!",
    link: "/discover/",
    color: "#2a9d8f"
  },
  {
    name: "Flag Guessing Game",
    description: "Test your knowledge of world flags!",
    link: "/flags/",
    color: "#e76f51"
  },
  {
    name: "Time Traveler",
    description: "Travel through time answering history questions!",
    link: "/time/",
    color: "#f4a261"
  }
];

const container = document.querySelector(".card-container");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");
const closeBtn = document.querySelector(".close");

games.forEach(game => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundColor = game.color;
  card.innerHTML = `<h3>${game.name}</h3><p>${game.description}</p>`;
  card.addEventListener("click", () => {
    modalTitle.textContent = game.name;
    modalDesc.textContent = game.description;
    modalLink.href = game.link;
    modal.classList.remove("hidden");
  });
  container.appendChild(card);
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});
