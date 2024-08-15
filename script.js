window.addEventListener("load", function() {
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function(result) {
        let listedPlanets = result;
        console.log(listedPlanets);

        let selectedPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);
    });

    let form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let pilotName = document.querySelector("input[name=pilotName]").value;
        let copilotName = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoMass = document.querySelector("input[name=cargoMass]").value;

        formSubmission(document, document.getElementById("faultyItems"), pilotName, copilotName, fuelLevel, cargoMass);
    });
});


