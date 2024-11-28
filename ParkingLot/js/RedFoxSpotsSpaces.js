// Fetch parking data and display the parking lot and its parking spaces
async function loadParkingLotDetails() {
    // Get the lotName from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const lotName = urlParams.get('lotName'); // This is the name of the lot to be displayed
    
    // Fetch the parking data from the JSON file
    const response = await fetch("https://CFdefense.github.io/SD330/parking.json");
    const data = await response.json();
    
    // Find the parking lot that matches the lotName
    const parkingLot = data.ParkingLots.find(lot => lot.LotName === lotName);
    
    // Display the parking lot image
    const lotImageContainer = document.getElementById('lot-image-container');
    const lotImage = document.createElement('img');
    lotImage.src = `../public/${parkingLot.FileImage}`;
    lotImage.alt = `${parkingLot.LotName} Image`;
    lotImageContainer.appendChild(lotImage);
    
    // Display the parking lot details
    const lotInfoContainer = document.getElementById('lot-info-container');
    lotInfoContainer.innerHTML = `
        <h2>${parkingLot.LotName}</h2>
        <p>Total Spaces: ${parkingLot.TotalSpace}</p>
        <p>Is Full: ${parkingLot.isFull ? 'Yes' : 'No'}</p>
        <p>Permit Required: ${parkingLot.PermitRequired ? 'Yes' : 'No'}</p>
    `;
    
    // Display the parking spaces
    const spacesContainer = document.getElementById('spaces-list');
    
    if (parkingLot.ParkingSpaces.length === 0) {
        // If no parking spaces are found, display none found message
        const noSpacesMessage = document.createElement('p');
        noSpacesMessage.innerText = "No parking spots available";
        noSpacesMessage.style.fontSize = '2.5em';
        noSpacesMessage.style.color = 'red';
        spacesContainer.appendChild(noSpacesMessage);
    } else {
        // Loop through the parking spaces of the selected lot
        parkingLot.ParkingSpaces.forEach(space => {
            const spaceDiv = document.createElement('div');
            spaceDiv.className = 'parking-space';

            // Conditionally Render Spot Information
            spaceDiv.innerHTML = `
                <p>Space ID: ${space.SpaceID}</p>
                <p>Space Type: ${space.SpaceType}</p>
                <p>Handicap Accessible: ${space.Handicap ? 'Yes' : 'No'}</p>
                <p>Status: ${space.Status}</p>
                <p>Time Left: ${space.TimeLeft !== -1 ? space.TimeLeft + ' mins' : 'N/A'}</p>
            `;
            
            spacesContainer.appendChild(spaceDiv);
        });
    }
}

loadParkingLotDetails();
