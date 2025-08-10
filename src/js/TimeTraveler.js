const form = document.getElementById("date-form");
const eventsContainer = document.getElementById("events-container");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const closeBtn = document.querySelector(".close");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const month = document.getElementById("month").value.padStart(2, '0');
  const day = document.getElementById("day").value.padStart(2, '0');

  try {
    const res = await fetch(`https://history.muffinlabs.com/date/${month}/${day}`);
    const data = await res.json();
    const events = data.data.Events;
    displayEvents(events);
  } catch (err) {
    eventsContainer.innerHTML = `<p>Something went wrong. Try another date.</p>`;
  }
});

function displayEvents(events) {
  eventsContainer.innerHTML = "";
  events.slice(0, 8).forEach((event) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.innerHTML = `
      <h3>${event.year}</h3>
      <p>${event.text.slice(0, 80)}...</p>
      <button class="read-more">View</button>
    `;
    card.querySelector(".read-more").addEventListener("click", () => {
      showModal(event);
    });
    eventsContainer.appendChild(card);
  });
}

function showModal(event) {
  modalTitle.textContent = `Year ${event.year}`;
  modalDesc.textContent = event.text;
  modal.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
