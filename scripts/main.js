
    // The first part of the user experience involves visitors to a specially designed site
    // inputting information and being shown transport options based on the number of people
    // in their party, and the length of time they intend to be traveling.

    // Motorbike 1 person - $109/day - min 1 day, max 5 days, 3.7L/100km
    // Small car 1-2 people - $129/day - min 1 day, max 10 days, 8.5L/100km
    // Large car 1-5 people - $144/day - min 3 days, max 10 days, 9.7L/100km
    // Motor home 2-6 people - $200/day - min 2 days, max 15 days, 17L/100km

    const vehiclesDiv = document.getElementById("vehicles-ul");


    function update(formData) {
        // Get user inputs
        passengers = formData.passengers;
        days = formData.days;
        vehiclesDiv.innerHTML = ''
        splideString = ''
        splideString += `
            <div class="main-splide" aria-label="transport options">
                <div class="splide__track">
                    <ul class="splide__list">`;
        // Validate user inputs against vehicle conditions and add available options to page
        numAvailableOptions = 0
        vehicles.forEach(vehicle => {
            if (passengers >= vehicle.minPassengers && passengers <= vehicle.maxPassengers && days >= vehicle.minDays && days <= vehicle.maxDays){
                splideString += makeVehicleCard(vehicle)
                numAvailableOptions++
            }
        });
        splideString += `
                    </ul>
                </div>
        </div>
        `
        vehiclesDiv.innerHTML += splideString

        //If there's no option available
        if (numAvailableOptions == 0) {
            vehiclesDiv.innerText = makeErrorMessage(passengers, days)
        }

        var splideSlider = document.getElementsByClassName( 'splide' );

        for ( var i = 0; i < splideSlider.length; i++ ) {
            new Splide( splideSlider[ i ], {
                type: 'loop',
                rewind: true,
                autoplay: true,
                pagination: false,
                arrows: false,
                interval: 2000,
            } ).mount();
        }

        var splide = new Splide( '.main-splide', {
            perPage: 1,
            perMove: 1,
            autoplay: false,
            rewind: false,
            arrows: true,
         
        }).mount() 
    }

    //Create HTML element to display individual vehicle options
    function makeVehicleCard(vehicle) {
        const imageSlider = makeImageSlider(vehicle)
        element = `
            <li class='vehicle-card splide__slide' >
                <div class="vehicle-card-container">
                    <div class="verhicle-images splide" aria-label="splide images slider">
                        <div class="splide__track">
                            <ul class="splide__list">
                                ${imageSlider}
                            </uL>
                        </div>
                        
                    </div>
                    <div class="vehicle-info">
                        <h2 class="dark-text"> ${vehicle.title} </h2>
                        <div class="vehicle-info-details">
                            <div> Suitable for: ${vehicle.minPassengers} to ${vehicle.maxPassengers} passengers </div>
                            <div> Cost to hire per day: $${vehicle.dailyRate} NZD </div>
                            <div> Length of hire: ${vehicle.minDays} to ${vehicle.maxDays} Days </div>
                            <div> Efficiency: ${vehicle.efficiency}L per 100KM</div> <br>

                            <div class="transport-cost-output-container">
                                <div class="input-row">
                                    <label for="days"> Distance of travel </label>
                                    <input type="number" name="distance" id="${vehicle.id}-distance-input">
                                </div>
                                <button class="button-medium button-solid" id="${vehicle.id}" onclick="hireVehicle(${vehicle.id})"> Estimate Trip </button>
                                <div id="${vehicle.id}-cost-estimate-output"> </div>
                            </div>
                        </div>

                       

                        
                    </div>
                </div>
            </li>
        `
        return element
    }

    function makeErrorMessage(passengers, days) {
        errorMessage = vehiclesDiv.innerText = "\n\nSorry, no options available for your selected party and/or length.\n\n";
        if (days > 10){
            errorMessage += 'Sorry, no vehicles available for 1 passenger and more than 10 days.\nPlease decrease days to below 10 or increase passenger number.'
        }
        if (passengers > 2 && days == 1){
            errorMessage += 'For more than two passengers, your travel time must be two or more days'
        }
        return errorMessage;
    }




    function hireVehicle(id) {
        let selectedVehicle = null;

        vehicles.forEach(vehicle => {
            if (id == vehicle.id) {
                selectedVehicle = vehicle
            }
        })
        const days = document.getElementById("days-input").value
        const distance = document.getElementById(selectedVehicle.id + "-distance-input").value
        const rentalCost = days * selectedVehicle.dailyRate
        const fuelConsumption = distance * selectedVehicle.efficiency/100

        if (!distance == '' && distance !==0) {
            document.getElementById(id + "-cost-estimate-output").innerHTML = `
            <div> Transport Estimations </div>
            <div> Rental cost: ${days} days * $${selectedVehicle.dailyRate} = $${rentalCost}    </div>
            <div> Fuel Consumption: ${distance}KM *  ${selectedVehicle.efficiency}L/100KM = ${Math.ceil(fuelConsumption)} liters </div>
        `
        }

        else {
            document.getElementById(id + "-cost-estimate-output").innerHTML = `
                <p> Please enter the distance in KMs to see your travel estimates </p>
            `
        }
    }


    function makeImageSlider(vehicle){
        var imageSlider = ''
        vehicle.images.forEach(image => {
            imageSlider += `<li> <img src="images/${image}"> </li>`
        })
        return imageSlider
    }

    //Capture submit event data from form
    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault()
        update({
            passengers: e.target.elements.passengers.value,
            days: e.target.elements.days.value,
        })
    })

    document.addEventListener("DOMContentLoaded", function(event) { 

        var textWrapper = document.querySelector('.fancy-animate');
        textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: true})
        .add({
            targets: '.fancy-animate .letter',
            scale: [4,1],
            opacity: [0,1],
            translateZ: 0,
            easing: "easeOutExpo",
            duration: 500,
            delay: (el, i) => 70*i
        }).add({
            targets: '.fancy-animate',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 7000
        });

        var textWrapper2 = document.querySelector('.fancy-animate2');
        textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

        anime.timeline({loop: true})
        .add({
            targets: '.fancy-animate2 .letter',
            opacity: [0,1],
            easing: "easeInOutQuad",
            duration: 3000,
            delay: 2000
        }).add({
            targets: '.fancy-animate2',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 4000
        });
    });