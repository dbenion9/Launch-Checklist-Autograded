require('cross-fetch/polyfill');

// Function to add destination info
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    document.getElementById("missionTarget").innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

// Function to validate input
function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById("copilotStatus");
    const fuelStatus = document.getElementById("fuelStatus");
    const cargoStatus = document.getElementById("cargoStatus");
    const launchStatus = document.getElementById("launchStatus");


    // Add event listener to the form submission
document.getElementById("launchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const pilot = document.getElementById("pilotName").value;
    const copilot = document.getElementById("copilotName").value;
    const fuelLevel = document.getElementById("fuelLevel").value;
    const cargoMass = document.getElementById("cargoMass").value;

    formSubmission(document, document.getElementById("faultyItems"), pilot, copilot, fuelLevel, cargoLevel);
});


    let readyForLaunch = true;
    let showAlert = false;
    
    // Reset the checklist and launch status to their default states
    list.style.visibility = "hidden";
    launchStatus.innerHTML = "Awaiting Information Before Launch";
    launchStatus.style.color = "black";

    // Basic validation checks including empty strings and NaN
    if (pilot === "" || copilot === "" || fuelLevel === "" || cargoMass === "" || isNaN(fuelLevel) || isNaN(cargoMass)) {
        showAlert = true;
    }

    // If there are any basic validation errors, show an alert and exit
    if (showAlert) {
        alert("All fields are required and fuel level and cargo mass must be valid numbers!");
        return; // Stop further execution if there are validation errors
    }

    // Detailed validation
    if (fuelLevel < 10000) {
        readyForLaunch = false;
        fuelStatus.innerHTML = "Fuel level too low for launch";
    } else {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    }

    if (cargoMass > 10000) {
        readyForLaunch = false;
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    } else {
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    }

    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

        
    // Only update the launch status and make the checklist visible if everything is valid
    if (readyForLaunch) {
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "rgb(0, 128, 0)";
        list.style.visibility = "visible"; // Show the checklist
    } else {
        // If validations fail, keep the default state and update the checklist with errors
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "rgb(255, 0, 0)";
       
    }
}
 

// Function to fetch planet data
async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
        return response.json();
    });
    return planetsReturned;
}


// Function to pick a random planet
function pickPlanet(planets) {
    return planets[Math.floor(Math.random() * planets.length)];
}



module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.myFetch = myFetch;
module.exports.pickPlanet = pickPlanet;
