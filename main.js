function videoReadyMessage() {
    document.getElementById("videoStatus").textContent = "Video ready to play";
  }

  window.onbeforeunload = function (e) {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    if (name && email && (name.value !== "" || email.value !== "")) {
      return "You have unsaved changes. Are you sure you want to leave?";
    }
  };

  function showConfirmation(event) {
    event.preventDefault(); 
    const name = document.getElementById("name").value;
    const output = document.getElementById("confirmation");
    output.textContent = `Thank you , ${name} , your registration was received!`;
    output.style.display = "block";
   }

    function storePreference() {
      const eventType = document.getElementById("eventType").value;
      localStorage.setItem("preferredEvent", eventType);
      sessionStorage.setItem("lastSelected", eventType);
    }

    function clearPreferences() {
      localStorage.removeItem("preferredEvent");
      sessionStorage.removeItem("lastSelected");
      document.getElementById("eventType").value = "";
      alert("Preferences have been cleared.");
    }

    window.onload = function () {
      const saved = localStorage.getItem("preferredEvent");
      if (saved) {
        const eventSelect = document.getElementById("eventType");
        if (eventSelect) eventSelect.value = saved;
      }
    };
      const events = [
     { name: "Sunset Yoga Jam", lat: 13.0500, lon: 80.2824 },
     { name: "Vintage Craft Bazaar", lat: 13.0331, lon: 80.2690 },
     { name: "Indie Film Meetup", lat: 13.0797, lon: 80.2870 },
     { name: "Open Mic & Poetry Slam", lat: 13.0256, lon: 80.2789 },
     { name: "Eco Walk & Birdwatch", lat: 13.0066, lon: 80.2340 },
     { name: "Design Sprint Challenge", lat: 13.0506, lon: 80.2412 },
     { name: "Midnight Food Truck Fest", lat: 13.0820, lon: 80.2756 },
     { name: "Science Storytelling Night", lat: 13.0105, lon: 80.2414 },
     { name: "Retro Gaming Arena", lat: 13.0722, lon: 80.2496 },
     { name: "Beach Drum Circle", lat: 13.0007, lon: 80.2683 }
    ];

    function findNearbyEvents() {
      const list = document.getElementById("nearbyEvents");
      list.innerHTML = '<li class="loading">Locating...</li>';


      if (!navigator.geolocation) {
          list.innerHTML = "<li>Geolocation not supported.</li>";
          return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLon = pos.coords.longitude;

          const nearby = events.filter(event => {
            const distance = getDistance(userLat, userLon, event.lat, event.lon);
            return distance <= 4;
          });

          if (nearby.length > 0) {
            list.innerHTML = nearby.map(e => {
                const mapsLink = `https://www.google.com/maps/search/?api=1&query=${e.lat},${e.lon}`;
                return `<li><a href="${mapsLink}" target="_blank">${e.name}</a></li>`;}).join("");
          } else {
            list.innerHTML = "<li>No events found nearby.</li>";
          }
        },
        () => {
          list.innerHTML = "<li>Unable to access your location.</li>";
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }

    function getDistance(lat1, lon1, lat2, lon2) {
      const toRad = (deg) => deg * Math.PI / 180;
      const R = 6371;
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a = Math.sin(dLat/2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }

    function validatePhone() {
      const phone = document.getElementById("phone").value;
      if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
      }
    }

    function showFee() {
      const feeDisplay = document.getElementById("feeDisplay");
      const event = document.getElementById("event").value;
      if (event === "workshop") {
        feeDisplay.textContent = "Fee: ₹100";
      } else if (event === "festival") {
        feeDisplay.textContent = "Fee: ₹50";
      } else if (event === "cleanup") {
        feeDisplay.textContent = "This event is free!";
      } else {
        feeDisplay.textContent = "";
      }
    }

    function countCharacters() {
      const feedback = document.getElementById("feedbackText").value;
      const charCount = document.getElementById("charCount");
      charCount.textContent = `${feedback.length} characters`;
    }

    function enlargeImage() {
      const img = document.getElementById("thankImg");
      img.classList.toggle("enlarged");
    }

    function confirmFeedback() {
      alert("Thanks for sharing your thoughts!");
      return false;
    }
   console.log("Welcome to the Community Portal");

window.addEventListener("load", () => {
  alert("Page fully loaded");
  simulateFetchEvents();
});

async function simulateFetchEvents() {
  const eventList = document.getElementById("nearbyEvents");
  if (eventList) eventList.innerHTML = "<li>Loading events...</li>";

  try {
    const response = await fakeFetch();
    const names = response.map(ev => ev.name).join(", ");
    console.log("Fetched events:", names);
    if (eventList) {
      eventList.innerHTML += `<li>Fetched: ${response.length} events.</li>`;
    }
  } catch (err) {
    console.error("Failed to fetch events:", err);
  }
}

function fakeFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { name: "Mock Yoga Fest" },
        { name: "Mock Tech Meetup" }
      ]);
    }, 1500);
  });
}

if (window.jQuery) {
  $(document).ready(() => {
    $(".gallery-img").on("click", function () {
      $(this).fadeOut(300).fadeIn(300);
    });
  });
}
