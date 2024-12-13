// Initialize the map
const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// List of stargazing spots
const stargazingSpots = [
    { name: "Horsley Hills", coords: [13.6601, 78.3992] },
    { name: "Rann of Kutch", coords: [23.7333, 70.8007] },
    { name: "Ladakh", coords: [34.1526, 77.5770] },
    { name: "Spiti Valley", coords: [32.2464, 78.0172] },
    { name: "Mahabaleshwar", coords: [17.9235, 73.6586] },
    { name: "Savandurga Hills", coords: [12.9192, 77.2920] },
    { name: "Nandi Hills", coords: [13.3702, 77.6835] },
    { name: "Coorg", coords: [12.3375, 75.8069] }
];

// Function to fetch weather and AQI data
async function fetchWeatherAndAQI(lat, lon) {
    const weatherApiKey = 'YOUR_WEATHER_API_KEY'; // Replace with your API key
    const airQualityApiKey = 'YOUR_AQI_API_KEY'; // Replace with your API key

    try {
        const [weatherResponse, aqiResponse] = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`),
            fetch(`https://api.waqi.info/feed/geo:${lat};${lon}/?token=${airQualityApiKey}`)
        ]);

        const weatherData = await weatherResponse.json();
        const aqiData = await aqiResponse.json();

        const windSpeed = weatherData.wind.speed; // in m/s
        const aqi = aqiData.data.aqi; // Air Quality Index

        return { windSpeed, aqi };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { windSpeed: null, aqi: null };
    }
}

// Add markers for each spot
stargazingSpots.forEach(async spot => {
    const marker = L.marker(spot.coords).addTo(map);

    // Fetch dynamic data
    const { windSpeed, aqi } = await fetchWeatherAndAQI(spot.coords[0], spot.coords[1]);

    // Determine suitability for stargazing
    let suitability = "Insufficient Data";
    if (windSpeed !== null && aqi !== null) {
        if (windSpeed < 5 && aqi < 50) {
            suitability = "Suitable for Stargazing!";
        } else {
            suitability = "Not Suitable for Stargazing.";
        }
    }

    // Add popup with dynamic data
    marker.bindPopup(`
        <b>${spot.name}</b><br>
        Wind Speed: ${windSpeed !== null ? `${windSpeed} m/s` : "N/A"}<br>
        AQI: ${aqi !== null ? aqi : "N/A"}<br>
        ${suitability}
    `);
});
