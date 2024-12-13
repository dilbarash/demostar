// Initialize the map
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 20.5937, lng: 78.9629 }, // Center on India
        zoom: 5,
    });
}

// Load the Google Maps script dynamically
const script = document.createElement("script");
script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
script.async = true;
document.head.appendChild(script);
