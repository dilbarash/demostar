// Initialize the map
const map = L.map('map').setView([20.5937, 78.9629], 5); // Center on India

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// List of stargazing spots
const stargazingSpots = [
    { name: "Horsley Hills", coords: [13.6601, 78.3992], description: "Clear skies and high altitude!" },
    { name: "Rann of Kutch", coords: [23.7333, 70.8007], description: "Amazing desert skies!" },
    { name: "Ladakh", coords: [34.1526, 77.5770], description: "Perfect for stargazing in the mountains." },
    { name: "Spiti Valley", coords: [32.2464, 78.0172], description: "Remote and clear night skies." },
    { name: "Mahabaleshwar", coords: [17.9235, 73.6586], description: "Great spot for stargazing near nature." }
];

// Add markers for each spot
stargazingSpots.forEach(spot => {
    const marker = L.marker(spot.coords).addTo(map);
    marker.bindPopup(`<b>${spot.name}</b><br>${spot.description}`);
});
