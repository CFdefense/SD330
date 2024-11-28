// Fetch parking data and display it
async function loadParkingLots() {
    const response = await fetch("https://CFdefense.github.io/SD330/parking.json");
    const data = await response.json();

    const container = document.getElementById('parking-lots-container');

    data.ParkingLots.forEach(parking_lot => {
        const lotDiv = document.createElement('div');
        lotDiv.className = 'parking-lot';

        lotDiv.innerHTML = `
            <img src="${parking_lot.FileImage}" alt="${parking_lot.LotName}">
            <div class="lot-info">
                <h2>${parking_lot.LotName}</h2>
            </div>
            <div class="lot-details">
                <p>Total Spaces: ${parking_lot.TotalSpace}</p>
                <p>Is Full: ${parking_lot.isFull ? 'Yes' : 'No'}</p>
                <p>Permit Required: ${parking_lot.PermitRequired ? 'Yes' : 'No'}</p>
            </div>
            <div class="buttons">
                <button onclick="showComments('${parking_lot.LotName}')">Show Comments</button>
                <button onclick="showSpaces('${parking_lot.LotName}')">Show Parking Spaces</button>
            </div>
        `;

        container.appendChild(lotDiv);
    });
}

// Placeholder functions for buttons
function showComments(lotName) {
    alert(`Displaying comments for ${lotName}`);
}

function showSpaces(lotName) {
    alert(`Displaying parking spaces for ${lotName}`);
}

loadParkingLots();
