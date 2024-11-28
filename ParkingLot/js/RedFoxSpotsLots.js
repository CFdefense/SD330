// Redirect to show parking spaces page with the lot name as a parameter
function showSpaces(lotName) {
    window.location.href = `../html/RedFoxSpotsSpaces.html?lotName=${lotName}`;
}

// Function to show the comments of a lot
async function showComments(lotName) {
    const response = await fetch("https://CFdefense.github.io/SD330/parking.json");
    const data = await response.json();

    const container = document.getElementById('comments-container');
    container.innerHTML = '';  // Clear previous comments

    data.ParkingLots.forEach(parking_lot => {
        if(parking_lot.LotName === lotName) {
            const comments = parking_lot.Comments;
            if (comments && comments.length > 0) {
                // Iterate over each comment and display them
                comments.forEach(comment => {
                    const commentDiv = document.createElement('div');
                    commentDiv.className = 'comment';

                    // Add content to the commentDiv
                    const commentText = document.createElement('p');
                    commentText.textContent = comment;
                    commentDiv.appendChild(commentText);

                    // Append the commentDiv to the container
                    container.appendChild(commentDiv);
                });
            } else {
                const noCommentsDiv = document.createElement('div');
                noCommentsDiv.className = 'no-comments';
                noCommentsDiv.textContent = 'No comments available.';
                container.appendChild(noCommentsDiv);
            }
        }
    });
}
// Fetch parking data and display it
async function loadParkingLots() {
    const response = await fetch("https://CFdefense.github.io/SD330/parking.json");
    const data = await response.json();

    const container = document.getElementById('parking-lots-container');

    data.ParkingLots.forEach(parking_lot => {
        const lotDiv = document.createElement('div');
        lotDiv.className = 'parking-lot';

        lotDiv.innerHTML = `
            <img src="../public/${parking_lot.FileImage}" alt="${parking_lot.LotName}">
            <div class="lot-info">
                <h2>${parking_lot.LotName}</h2>
            </div>
            <div class="lot-details">
                <p>Total Spaces: ${parking_lot.TotalSpace}</p>
                <p>Is Full: ${parking_lot.isFull ? 'Yes' : 'No'}</p>
                <p>Permit Required: ${parking_lot.PermitRequired ? 'Yes' : 'No'}</p>
            </div>
            <div class="buttons">
                <button class="show-comments">Show Comments</button>
                <button class="show-spaces">Show Parking Spaces</button>
            </div>
        `;

        container.appendChild(lotDiv);

        // Attach event listeners to the buttons after the DOM is created
        const showSpacesButton = lotDiv.querySelector('.show-spaces');
        showSpacesButton.addEventListener('click', () => showSpaces(parking_lot.LotName));

        const showCommentsButton = lotDiv.querySelector('.show-comments');
        showCommentsButton.addEventListener('click', () => showComments(parking_lot.LotName));
    });
}

// Call loadParkingLots when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadParkingLots);
