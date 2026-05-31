
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

  container.innerHTML =

    `<h2 style="text-align:center;">
      Loading places...
    </h2>`;

  try {

    const response =
      await fetch(

  `/places?city=${encodeURIComponent(city)}&category=${encodeURIComponent(category)}`

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

    places.forEach(place => {

      container.innerHTML += `

      <div class="place-card">

        

        <div class="place-info">

          <h2>
            ${place.name}
          </h2>

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



