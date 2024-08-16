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
    
    // Initially hide the list
    list.style.visibility = "hidden";
  

    // Set initial status to "Awaiting Information Before Launch"
    launchStatus.innerHTML = "Awaiting Information Before Launch";
    launchStatus.style.color = "black";  



    // Validate Pilot inputs
    if (pilot === "" || copilot === "" || isNaN(fuelLevel) || isNaN(cargoMass)) {
        showAlert = true;
    } else {
    
        // Check fuel level
        if (fuelLevel < 10000) {
            readyForLaunch = false;
            document.getElementById('fuelStatus').innerHTML = "Fuel level too low for launch";
        } else {
            document.getElementById('fuelStatus').innerHTML = "Fuel level high enough for launch";
        }

        // Check cargo mass
        if (cargoMass > 10000) {
            readyForLaunch = false;
            document.getElementById('cargoStatus').innerHTML = "Cargo mass too heavy for launch";
        } else {
            document.getElementById('cargoStatus').innerHTML = "Cargo mass low enough for launch";
        }

        // Update pilot and copilot status
        document.getElementById('pilotStatus').innerHTML = `Pilot ${pilot} is ready for launch`;
        document.getElementById('copilotStatus').innerHTML = `Co-pilot ${copilot} is ready for launch`;
    }

    // Show the alert and stop if there's invalid input
    if (showAlert) {
        alert("All fields are required and fuel level and cargo mass must be valid numbers!");
        return; 
    }

    // Update launch status and list visibility
    if (readyForLaunch) {
        document.getElementById('launchStatus').innerHTML = "Shuttle is Ready for Launch";
        document.getElementById('launchStatus').style.color = "rgb(0, 128, 0)";
    } else {
        document.getElementById('launchStatus').innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById('launchStatus').style.color = "rgb(255, 0, 0)";
    }

    // Make the list visible only when all fields pass validation checks
    document.getElementById('faultyItems').style.visibility = "visible";
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
