const vehiclesDiv = document.getElementById("vehicles-ul")

function update(formData) {
	// Get user inputs
	passengers = formData.passengers;
	days = formData.days;
	vehiclesDiv.innerHTML = ''
	splideString = ''
	splideString += `
            <div class="main-splide" aria-label="transport options">
                <div class="splide__track">
                    <ul class="splide__list">`
	// Validate user inputs against vehicle conditions and add available options to page
	numAvailableOptions = 0
	vehicles.forEach(vehicle => {
		if (passengers >= vehicle.minPassengers && passengers <= vehicle.maxPassengers && days >= vehicle.minDays && days <= vehicle.maxDays) {
			splideString += makeVehicleCard(vehicle)
			numAvailableOptions++
		}
	})
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

	var splideSlider = document.getElementsByClassName('splide');

	for (var i = 0; i < splideSlider.length; i++) {
		new Splide(splideSlider[i], {
			type: 'loop',
			rewind: true,
			autoplay: true,
			pagination: false,
			arrows: false,
			interval: 2000,
		}).mount()
	}

	var splide = new Splide('.main-splide', {
		perPage: 1,
		perMove: 1,
		autoplay: false,
		rewind: false,
		arrows: false,
		drag: false,
	}).mount()
}

//Create HTML element to display individual vehicle options
function makeVehicleCard(vehicle) {
	const imageSlider = makeImageSlider(vehicle)
	element = `
            <li class='vehicle-card splide__slide' >
                <div class="vehicle-card-container">
                <div class="verhicle-images">
                    <div class="splide" aria-label="splide images slider">
                        <div class="splide__track">
                            <ul class="splide__list">
                                ${imageSlider}
                            </uL>
                        </div>
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
                                <label for="days"> Distance of travel </label>
                                <div class="input-row flex">
                                    <input class="input-box" type="number" name="distance" id="${vehicle.id}-distance-input" placeholder="e.g 500">
                                    <button class="button-large button-solid" id="${vehicle.id}" onclick="hireVehicle(${vehicle.id})"> Estimate Trip </button>
                                </div>
                                
                                <div id="${vehicle.id}-cost-estimate-output"> </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `
	return element;
}

function makeErrorMessage(passengers, days) {
	errorMessage = vehiclesDiv.innerText = "\n\nSorry, no options available for your selected party and/or length.\n\n";
	if (days > 10) {
		errorMessage += 'Sorry, no vehicles available for 1 passenger and more than 10 days.\nPlease decrease days to below 10 or increase passenger number.'
	}
	if (passengers > 2 && days == 1) {
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
	const fuelConsumption = distance * selectedVehicle.efficiency / 100
	if (!distance == '' && distance !== 0) {
		console.log("value entered");
		document.getElementById(id + "-cost-estimate-output").innerHTML = `
                <h3> Transport Estimations </h3>
                <div> Rental cost: ${days} days * $${selectedVehicle.dailyRate} = $${rentalCost} </div>
                <div> Fuel Consumption: ${distance}KM *  ${selectedVehicle.efficiency}L/100KM = ${Math.ceil(fuelConsumption)} liters </div>
        `
	} else {
		document.getElementById(id + "-cost-estimate-output").innerHTML = `
                <p> Please enter the distance in KMs to see your travel estimates </p>
            `
	}
}


function makeImageSlider(vehicle) {
	var imageSlider = ''
	vehicle.images.forEach(image => {
		imageSlider += `<li> <img src="images/${image}"> </li>`
	})
	return imageSlider
}

function slideUp() {
	$('.vehicles-output').toggleClass('is-active');
}

//Capture submit event data from form
document.getElementById("form").addEventListener("submit", (e) => {
	e.preventDefault()
	update({
		passengers: e.target.elements.passengers.value,
		days: e.target.elements.days.value,
	})

	slideUp()
})

document.addEventListener("DOMContentLoaded", function(event) {
	var textWrapper = document.querySelector('.fancy-animate');
	textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
	anime.timeline({
			loop: true
		})
		.add({
			targets: '.fancy-animate .letter',
			scale: [4, 1],
			opacity: [0, 1],
			translateZ: 0,
			easing: "easeOutExpo",
			duration: 500,
			delay: (el, i) => 70 * i
		}).add({
			targets: '.fancy-animate',
			opacity: 0,
			duration: 1000,
			easing: "easeOutExpo",
			delay: 7000
		})

	var textWrapper2 = document.querySelector('.fancy-animate2');
	textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>")

	anime.timeline({
			loop: true
		})
		.add({
			targets: '.fancy-animate2 .letter',
			opacity: [0, 1],
			easing: "easeInOutQuad",
			duration: 3000,
			delay: 2000
		}).add({
			targets: '.fancy-animate2',
			opacity: 0,
			duration: 1000,
			easing: "easeOutExpo",
			delay: 4000
		})
})