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

    let readyForLaunch = true;
    
  // Make the checklist visible
  list.style.visibility = "visible";  
  
    // Add event listener to the form submission
document.getElementById("launchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const pilot = document.getElementById("pilotName").value;
    const copilot = document.getElementById("copilotName").value;
    const fuelLevel = document.getElementById("fuelLevel").value;
    const cargoMass = document.getElementById("cargoMass").value;

    formSubmission(document, document.getElementById("faultyItems"), pilot, copilot, fuelLevel, cargoLevel);
});

    // Set initial status to "Awaiting Information Before Launch"
    launchStatus.innerHTML = "Awaiting Information Before Launch";
    launchStatus.style.color = "black";  
    list.style.visibility = "visible";


// Check if all fields are blank
if (pilot === "" && copilot === "" && fuelLevel === "" && cargoMass === "") {
    alert("All fields are required");
    return;  
}

    // Update pilot and co-pilot status
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

       // Validate pilot and co-pilot names
       if (pilot === "" || copilot === "") {
        alert("Pilot and Co-pilot names are required.");
        readyForLaunch = false;
    }
    
    let fuelValidation = validateInput(fuelLevel);
    if (fuelValidation !== "Is a Number") {
        alert("Make sure to enter valid information for each field!");
        readyForLaunch = false;
    }


   // Validate fuel level
if (fuelLevel < 10000) {
    fuelStatus.innerHTML = "Fuel level too low for launch";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";  
    list.style.visibility = "visible"; 
    readyForLaunch = false;
} else {
    fuelStatus.innerHTML = "Fuel level high enough for launch";
}

let cargoValidation = validateInput(cargoMass);
    if (cargoValidation !== "Is a Number") {
        alert("Make sure to enter valid information for each field!");
        readyForLaunch = false;
    }

// Validate cargo mass
if (cargoMass > 10000) {
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    readyForLaunch = false;
} else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
}
if (readyForLaunch) {
    launchStatus.innerHTML = "Shuttle is ready for launch";
    launchStatus.style.color = "green";
    list.style.visibility = "hidden";
} else {
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    launchStatus.style.color = "red";
    list.style.visibility = "visible";
}


        // Update launch status based on readiness
        if (readyForLaunch) {
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            launchStatus.style.color = "green";
            list.style.visibility = "visible";
        } else {
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
            list.style.visibility = "visible";
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

