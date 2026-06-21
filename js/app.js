
// ==========================
// STATES AND CITIES
// ==========================

const cities = {

  Karnataka: [
    "Bengaluru",
    "Mysuru",
    "Hubli",
    "Mangalore",
    "Belagavi",
    "Kalaburagi",
    "Raichur",
    "Ballari",
    "Shivamogga",
    "Bidar"
  ],

  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    "Nashik",
    "Aurangabad",
    "Kolhapur",
    "Thane"
  ],

  Telangana: [
    "Hyderabad",
    "Warangal",
    "Karimnagar",
    "Nizamabad",
    "Khammam",
    "Mahabubnagar"
  ],

  "Tamil Nadu": [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Salem",
    "Vellore",
    "Erode"
  ],

  Kerala: [
    "Kochi",
    "Thiruvananthapuram",
    "Kozhikode",
    "Thrissur"
  ],

  "Andhra Pradesh": [
    "Vijayawada",
    "Visakhapatnam",
    "Guntur",
    "Nellore",
    "Kurnool",
    "Rajahmundry"
  ]

};

// ==========================
// DROPDOWNS
// ==========================

const stateSelect =
  document.getElementById("stateSelect");

const citySelect =
  document.getElementById("citySelect");

// ==========================
// LOAD CITIES
// ==========================

if (stateSelect && citySelect) {

  stateSelect.addEventListener(
    "change",
    () => {

      const selectedState =
        stateSelect.value;

      citySelect.innerHTML =
        '<option value="">Select City</option>';

      if (cities[selectedState]) {

        cities[selectedState]
          .forEach(city => {

            const option =
              document.createElement("option");

            option.value = city;
            option.textContent = city;

            citySelect.appendChild(option);

          });

      }

    }
  );

}

// ==========================
// GO TO SERVICES
// ==========================

function goToServices() {

    const state = document.getElementById("stateSelect").value;
    const city = document.getElementById("citySelect").value;

    if (state === "" || city === "") {
        alert("Please select State and City first!");
        return;
    }

    localStorage.setItem("state", state);
    localStorage.setItem("city", city);

    window.location.href = "services.html";
}

// ==========================
// OPEN CATEGORY
// ==========================

function openCategory(category) {

  localStorage.setItem(
    "category",
    category
  );

  window.location.href =
    "details.html";

}

// ==========================
// LOAD LIVE PLACES
// ==========================

async function loadPlaces() {

  const container =
    document.getElementById(
      "placesContainer"
    );

  if (!container) return;

  const city =
    localStorage.getItem("city");

  const category =
    localStorage.getItem("category");

  const title =
    document.getElementById(
      "categoryTitle"
    );

  if (title) {

    title.innerText =
      `${category.toUpperCase()} IN ${city}`;

  }

 container.innerHTML = `
  <div class="loading-box">
      <div class="spinner"></div>
      <p>Loading Places...</p>
  </div>
`;
  try {

   const API_BASE =
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "";

const response = await fetch(
  `${API_BASE}/places?city=${encodeURIComponent(city)}&category=${encodeURIComponent(category)}`
);
    const places =
      await response.json();

    console.log(places);

    container.innerHTML = "";

    if (
      !places ||
      places.length === 0
    ) {

      container.innerHTML =

        `<h2 style="text-align:center;">
          No places found.
        </h2>`;

      return;

    }

   places.forEach((place, index) => {

      container.innerHTML += `

     <div class="place-card" style="animation-delay:${index * 0.15}s;">

        

        <div class="place-info">

          <h2>
            ${place.name}
       <span onclick='addToFavorites(${JSON.stringify(place)})' class="fav-icon">
    ♡
</span>

          <p>
            📍 ${place.address}
          </p>

          <p>
            ⭐ Rating:
            ${place.rating}
          </p>

          <p>
            👥 Reviews:
            ${place.reviews}
          </p>

    <button onclick="bookSlot('${place.name}')" class="book-btn">
  Book Slot
</button>     
          <a
            href="${place.mapLink}"
            target="_blank"
          >

            <button>
              View On Map
            </button>

          </a>
          

        </div>

      </div>

      `;

    });

  } catch (error) {

    console.error(error);

    container.innerHTML =

      `<h2 style="text-align:center;color:red;">
        Error loading places.
      </h2>`;

  }

}

// ==========================
// DETAILS PAGE ONLY
// ==========================

if (
  document.getElementById(
    "placesContainer"
  )
) {

  loadPlaces();

}
function clearLocation() {

    localStorage.removeItem("state");
    localStorage.removeItem("city");
    localStorage.removeItem("category");

}

function checkServicesAccess() {

    const state = localStorage.getItem("state");
    const city = localStorage.getItem("city");

    if (!state || !city) {

        alert("⚠ Please select State and City first!");

        window.location.href = "index.html";
        return;
    }

    window.location.href = "services.html";
}
function filterPlaces() {

  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();

  const cards = document.querySelectorAll(".place-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();

    if (text.includes(filter)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });

}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

window.onload = function () {
    if(localStorage.getItem("theme") === "dark"){
        document.body.classList.add("dark-mode");
    }
}
async function loadWeather() {

    const weatherBox = document.getElementById("weatherBox");

    if (!weatherBox) return;

    const city = localStorage.getItem("city");

    if (!city) {
        weatherBox.innerHTML = "City not selected";
        return;
    }

    try {
        const apiKey = "ebb10aeff45fbcebb571ef974a16231d";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

       weatherBox.innerHTML = `
    <h2>🌤 ${city}</h2>
    <p>🌡 ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind: ${data.wind.speed} m/s</p>
`;

    } catch (error) {
        console.log(error);
        weatherBox.innerHTML = "Weather unavailable";
    }
}
loadWeather();
function bookSlot(placeName) {
    document.getElementById("bookingModal").style.display = "block";
}

function closeModal() {
    document.getElementById("bookingModal").style.display = "none";
}

function confirmBooking() {
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTime").value;

    if (!name || !phone || !date || !time) {
        alert("Please fill all details!");
        return;
    }

    alert("✅ Booking Confirmed Successfully!");

    setTimeout(() => {
        alert("⏰ Reminder: Your slot starts in 5 minutes!");
    }, 5000);

    closeModal();
}
function addToFavorites(place) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.push(place);

    localStorage.setItem("favorites", JSON.stringify(favorites));

    alert("❤️ Added to Favorites!");
}