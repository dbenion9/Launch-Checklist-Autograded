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

// Function to handle form submission
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById("copilotStatus");
    const fuelStatus = document.getElementById("fuelStatus");
    const cargoStatus = document.getElementById("cargoStatus");
    const launchStatus = document.getElementById("launchStatus");

    let readyForLaunch = true;

    // Validate pilot and copilot names
    if (pilot === "" || copilot === "") {
        alert("Pilot and Co-pilot names are required.");
        readyForLaunch = false;
    }

    // Validate fuel level
    let fuelValidation = validateInput(fuelLevel);
    if (fuelValidation !== "Is a Number") {
        alert("Fuel level must be a number.");
        readyForLaunch = false;
    } else if (fuelLevel < 10000) {
        fuelStatus.innerHTML = "Fuel level too low for launch";
        readyForLaunch = false;
    } else {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    }

    // Validate cargo mass
    let cargoValidation = validateInput(cargoLevel);
    if (cargoValidation !== "Is a Number") {
        alert("Cargo mass must be a number.");
        readyForLaunch = false;
    } else if (cargoLevel > 10000) {
        cargoStatus.innerHTML = "Cargo mass too high for launch";
        readyForLaunch = false;
    } else {
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    }

    // Update launch status
    if (readyForLaunch) {
        launchStatus.innerHTML = "Shuttle is ready for launch";
        launchStatus.style.color = "green";
    } else {
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = "red";
    }

    list.style.visibility = "visible";
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
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

// Add event listener to the form submission
document.getElementById("launchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const pilot = document.getElementById("pilotName").value;
    const copilot = document.getElementById("copilotName").value;
    const fuelLevel = document.getElementById("fuelLevel").value;
    const cargoLevel = document.getElementById("cargoMass").value;

    formSubmission(document, document.getElementById("faultyItems"), pilot, copilot, fuelLevel, cargoLevel);
});

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.myFetch = myFetch;
module.exports.pickPlanet = pickPlanet;










