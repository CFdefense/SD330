
function openFridge() {
    // Get Image and Button State
    var image = document.getElementById("fridgeImage");
    var button = document.getElementById("fridgeButton");

    // Change fridge image
    if (image.src.includes("https://live.staticflickr.com/65535/54060939000_e69c4bd976_z.jpg")) {
        image.src = "https://live.staticflickr.com/65535/54060938725_e00a1947d7_z.jpg";
    } else {
        image.src = "https://live.staticflickr.com/65535/54060939000_e69c4bd976_z.jpg";
    }

    // Change button text
    if (button.innerHTML.includes("Open Fridge")) {
        button.innerHTML = "Close Fridge";
    } else {
        button.innerHTML = "Open Fridge";
    }
}

function toggleElement(state) {
    var onToggle = document.getElementById("onToggle");
    var offToggle = document.getElementById("offToggle");
    var buttonElements = document.getElementById("buttonElements");
    var displayElement = document.getElementById("displayElement");

    if (state === 'on') {
        onToggle.classList.add('bold');
        onToggle.classList.remove('normal');
        offToggle.classList.add('normal');
        offToggle.classList.remove('bold');

        // Show the button elements and display
        buttonElements.style.display = "block";
        displayElement.style.display = "block";
    } else {
        offToggle.classList.add('bold');
        offToggle.classList.remove('normal');
        onToggle.classList.add('normal');
        onToggle.classList.remove('bold');

        // Hide the button elements and display
        buttonElements.style.display = "none";
        displayElement.style.display = "none";
    }
}

// Variable to keep track of the clock format
var is24HourFormat = true;

function toggleClockFormat() {
    is24HourFormat = !is24HourFormat;
    updateClock(); // Update the clock immediately to reflect the new format
}

function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var seconds = String(now.getSeconds()).padStart(2, '0');
    var ampm = '';

    if (!is24HourFormat) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
    }

    hours = String(hours).padStart(2, '0');
    var currentTime = hours + ':' + minutes + ':' + seconds + (is24HourFormat ? '' : ' ' + ampm);

    document.getElementById('clockElement').innerText = currentTime;
}

// Update the clock every second
setInterval(updateClock, 1);
updateClock();

// Initialize temperature in Fahrenheit
let isFahrenheit = true;
let temperature = Math.floor(Math.random() * 60 + 30); // Start with a random temperature between 30°F and 90°F

function displayTemperature() {
    const temperatureElement = document.getElementById("temperatureValue");
    temperatureElement.innerText = `${temperature}°${isFahrenheit ? 'F' : 'C'}`;
}

function toggleTemperatureUnit() {
    if (isFahrenheit) {
        // Convert to Celsius
        temperature = Math.round((temperature - 32) * (5 / 9));
    } else {
        // Convert to Fahrenheit
        temperature = Math.round((temperature * 9) / 5 + 32);
    }
    isFahrenheit = !isFahrenheit;
    displayTemperature();
}

function adjustTemperature(change) {
    temperature += change;
    displayTemperature();
}

// Update changeDisplay function to show temperature controls
function changeDisplay(option) {
    var displayImage = document.getElementById("displayImage");
    var temperatureDisplay = document.getElementById("temperatureDisplay");
    var timerDisplay = document.getElementById("timerDisplay");
    var shoppingListDisplay = document.getElementById("shoppingListSection");

    // Hide the temperature and other elements initially
    displayImage.style.display = "none";
    temperatureDisplay.style.display = "none";
    timerDisplay.style.display = "none";
    shoppingListDisplay.style.display = "none";

    switch (option) {
        case 'netflix':
            displayImage.src = "https://live.staticflickr.com/65535/54060866584_bd13fb0d5d_z.jpg";
            displayImage.style.display = "block";

            // Play sound
            var netflixSound = new Audio("Fridge/static/netflix.mp3");
            netflixSound.play();
            break;
        case 'browser':
            displayImage.src = "https://live.staticflickr.com/65535/54060992255_8d1b3ed83e_z.jpg";
            displayImage.style.display = "block";
            break;
        case 'music':
            displayImage.src = "Fridge/static/spotify.jpg";
            displayImage.style.display = "block";
            displayImage.style.width = "640px";
            displayImage.style.height = "400px";
            break;
        case 'settings':
            displayImage.src = "https://live.staticflickr.com/65535/54060540036_1037a45c0b_z.jpg";
            displayImage.style.display = "block";
            break;
        case 'temperature':
            temperatureDisplay.style.display = "block";
            displayTemperature();
            break;
        case 'weather':
            displayImage.src = "Fridge/static/weather.png";
            displayImage.style.display = "block";
            displayImage.style.width = "640px";
            displayImage.style.height = "400px";
            break;
        case 'timer':
            timerDisplay.style.display = "block";
            updateDisplay();
            break;
        case 'list':
            shoppingListDisplay.style.display = "block";
            break;
    }
}

let timeLeft = 60; // 60 seconds (1 minute)
let timerInterval;

function startTimer() {
  // Prevent multiple intervals
  if (timerInterval) return;

  updateDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;

    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);

      // Play sound
      var timerSound = new Audio("Fridge/static/alarm.mp3");
      timerSound.play();

      timerInterval = null; // reset the interval
    }
  }, 1000); // update every second
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null; // clear the interval reference
  timeLeft = 60; // reset to 1 minute
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("timer-display");
  display.textContent = `${timeLeft}s`;
}

// Initialize the shopping list with existing items and attach click event listeners
function initializeShoppingList() {
    const initialItems = ["Milk", "Bread", "Eggs", "Butter", "Cheese"];
    const list = document.getElementById("shoppingList");

    initialItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;

        // Add click event to remove item when clicked
        li.addEventListener('click', function() {
            list.removeChild(li);
        });

        list.appendChild(li);
    });
}

// Add new item to shopping list
function addItem(event) {
    if (event.key === 'Enter') {
        var newItem = document.getElementById("newItemInput").value;
        if (newItem) {
            var list = document.getElementById("shoppingList");
            var li = document.createElement("li");
            li.textContent = newItem;

            // Add click event to remove item when clicked
            li.addEventListener('click', function() {
                list.removeChild(li);
            });

            list.appendChild(li);
            document.getElementById("newItemInput").value = ""; // Clear input field
        } else {
            alert("Please enter an item.");
        }
    }
}

// Initialize the shopping list on page load
window.onload = function() {
    initializeShoppingList();
};