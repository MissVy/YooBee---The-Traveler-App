
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
                                <button class="button-medium button-solid" id="${vehicle.id}"> Estimate Trip </button>
                                <div id="${vehicle.id}-cost-estimate-output"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `
        return element
    }

    //Capture submit event data from form
    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault()
        update({
            passengers: e.target.elements.passengers.value,
            days: e.target.elements.days.value,
        })
    })
