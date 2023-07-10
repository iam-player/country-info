// api call button
const getData = document.getElementById("getData");

// api input
const search = document.getElementById("search");

// base data elements
const dataContainer = document.getElementById("dataContainer");
const dataTable = document.getElementById("dataTable");
const dataHeader = document.getElementById("dataHeader");
const dataSubHeader = document.getElementById("dataSubHeader");

// extended data elements
const countryFlag = document.getElementById("countryFlag");
const countryLanguages = document.getElementById("countryLanguages");
const countryCurrencies = document.getElementById("countryCurrencies");
const countryRegion = document.getElementById("countryRegion");
const countrySubRegion = document.getElementById("countrySubRegion");

// async fetch from api
const getDataFromUrl = async () => {
	// api url + user input
	const api = `https://restcountries.com/v3.1/name/${search.value}`;

	try {
		const response = await fetch(api, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
			credentials: "same-origin",
			mode: "cors",
			cache: "no-cache",
		});

		if (response.status === 404) {
			search.classList.add('error');
			search.classList.add('bounce');
		} else if (!response.ok) {
			throw new Error(`HTTP protocol error: ${response.status}`);
		} else {
			// response handler
			const json = await response.json();
			const countryJson = json[0];

			// country obj
			const countryModel = {
				officialName: String(countryJson.name?.official || "Name"),
				commonName: String(countryJson.name?.common || "Common Name"),
				capital: String(countryJson.capital || "Capital"),
				flag: String(countryJson?.flag || countryJson?.fifa || "flag"),
				language: Object.values(countryJson.languages).join(", "),
				currency: Object.keys(countryJson.currencies).join(", "),
				region: String(countryJson.region),
				subRegion: String(countryJson.subregion),
			};

			// push data
			dataHeader.innerText = countryModel.commonName + " (" + countryModel.capital + ")";
			dataSubHeader.innerText = countryModel.officialName;
			countryFlag.innerText = countryModel.flag;

			// language(s) for more than 1 lang
			if (Object.values(countryJson.languages).length > 1) {
				countryLanguages.innerText = `Languages: ${countryModel.language}`
			} else {
				countryLanguages.innerText = `Language: ${countryModel.language}`
			}

			// currency(ies) for more than 1 curr
			if (Object.values(countryJson.currencies).length > 1) {
				countryCurrencies.innerText = `Currencies: ${countryModel.currency}`
			} else {
				countryCurrencies.innerText = `Currency: ${countryModel.currency}`
			}

			countryRegion.innerHTML = `Region: ${countryModel.region}`;
			countrySubRegion.innerHTML = `Sub-region: ${countryModel.subRegion}`;
		}
	} catch (err) {
		console.error(err);
	}
};

// get data on "Enter" keydown event
search.addEventListener("keydown", (e) => {
	//remove error class
	search.classList.remove('error');

	// keyCode is deprecated - using .key & .code insteaed
	if (e.code === "Enter" || e.key === "Enter" || e.isComposing === "true") {
		getDataFromUrl();
	} 
	
});

// get data on click event
getData.addEventListener("click", () => {
	getDataFromUrl();
});
