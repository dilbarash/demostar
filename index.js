// Initialize the map
const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example stargazing location
const stargazingSpot = L.marker([15.9129, 79.73999]).addTo(map);
stargazingSpot.bindPopup('Great spot for stargazing!').openPopup();
