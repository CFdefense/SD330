
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

function updateClock() {
    var now = new Date();
    var hours = String(now.getHours()).padStart(2, '0');
    var minutes = String(now.getMinutes()).padStart(2, '0');
    var seconds = String(now.getSeconds()).padStart(2, '0');
    var currentTime = hours + ':' + minutes + ':' + seconds;

    document.getElementById('clockElement').innerText = currentTime;
}

// Update the clock every second
setInterval(updateClock, 1000);
updateClock();

function changeDisplay(option) {
    var imageSrc = "";
    var displayImage = document.getElementById("displayImage");

    switch (option) {
        case 'netflix':
            imageSrc = "https://live.staticflickr.com/65535/54060866584_bd13fb0d5d_z.jpg";
            break;
        case 'browser':
            imageSrc = "https://live.staticflickr.com/65535/54060992255_8d1b3ed83e_z.jpg";
            break;
        case 'settings':
            imageSrc = "https://live.staticflickr.com/65535/54060540036_1037a45c0b_z.jpg";
            break;
        case 'temperature':
            imageSrc = "https://live.staticflickr.com/65535/54060539951_87e428d917_z.jpg";
            break;
    }

    // Update image and button styles
    displayImage.src = imageSrc;
    displayImage.style.display = "block";

    // Reset styles for all buttons
    var buttons = document.querySelectorAll("#buttonElements button");
    buttons.forEach(button => {
        button.style.fontWeight = 'normal'; // Reset to normal
    });

    // Bold the clicked button
    var clickedButton = Array.from(buttons).find(button => button.innerText.toLowerCase() === option);
    if (clickedButton) {
        clickedButton.style.fontWeight = 'bold';
    }
}