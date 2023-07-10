// API call button
const getData = document.getElementById("getData");

// API input
const search = document.getElementById("search");

// async fetch from API
const getDataFromUrl = async () => {
	// user input + api url
	const api = "https://restcountries.com/v3.1/name/" + search.value;

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

		if (!response.ok) {
			throw new Error("HTTP protocol error: " + response.status);
		}

		// response handler
		const dataList = document.getElementById("dataList");
		const jsonData = await response.json();

		const countryModel = {
			officialName: jsonData[0]['official'],
			commonName: jsonData[0]['common'],
			flag: jsonData[0]['flag'],
			languages: jsonData[0][0]
		};


		//log data
		console.log(jsonData);

		dataList.innerHTML +=
			'<h2><span class="flag">' +
			countryModel['flag'] +
			"</span>" +
			jsonData[0].name["common"] +
			"</h2>";
		dataList.innerHTML += "<p>" + jsonData[0].name["official"] + "</p>";
		dataList.innerHTML +=
			"<p>Languages: " + jsonData.keys(languages)[0] + "</p>";
	} catch (err) {
		console.error(err);
	}
};

search.addEventListener("keydown", (e) => {
	if (e.code === "Enter" || e.isComposing === "true") {
		getDataFromUrl();
	}
});

getData.addEventListener("click", () => {
	getDataFromUrl();
});
