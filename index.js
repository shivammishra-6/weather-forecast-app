const apiKey = "d8597e7e710d81e402869e136f261268";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const suggestionsDiv = document.getElementById('suggestions');
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// Indian cities and areas dataset
const indianCities = [
    // Major Metropolitan Cities
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    // Other Major Cities
    "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal",
    "Visakhapatnam", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Coimbatore",
    // Northern Cities
    "Chandigarh", "Amritsar", "Shimla", "Srinagar", "Manali", "Nainital", "Rishikesh",
    "Agra", "Varanasi", "Meerut", "Guwahati", "Srinagar", "Jammu",
    // Western Cities
    "Rajkot", "Aurangabad", "Nashik", "Solapur", "Goa", "Panaji", "Vasco da Gama",
    // Southern Cities
    "Kochi", "Thrissur", "Kannur", "Calicut", "Mangalore", "Mysore", "Salem",
    "Madurai", "Tirupati", "Cochin", "Vijayawada", "Visakhapatnam",
    // Eastern Cities
    "Bhubaneswar", "Cuttack", "Ranchi", "Jharia", "Asansol", "Durgapur",
    // Tier 2 Cities
    "Alappuzha", "Ernakulam", "Wayanad", "Idukki", "Malappuram", "Pathanamthitta",
    "Kollam", "Thiruvananthapuram", "Kakinada", "Rajahmundry", "Guntur", "Ongole",
    "Nellore", "Chittoor", "Kadapa", "Anantapur", "Belgaum", "Gulbarga", "Raichur",
    "Bijapur", "Davangere", "Udupi", "Hospet", "Hubli", "Dharwad", "Belgaum",
    // Additional Cities
    "Erode", "Dindigul", "Kumbakonam", "Thanjavur", "Tirunelveli", "Kanyakumari",
    "Pondicherry", "Yanam", "Karaikal", "Mahe", "Allahabad", "Mirzapur", "Jhansi",
    "Gwalior", "Morena", "Ratlam", "Ujjain", "Jabalpur", "Satna", "Rewa",
    "Indore", "Dhar", "Mhow", "Khandwa", "Khargone", "Betul", "Harda",
    "Ashok Nagar", "Vidisha", "Sehore", "Raisen", "Rajgarh", "Agar Malwa",
    // Himalayan Towns
    "Dehradun", "Mussoorie", "Nainital", "Almora", "Ranikhet", "Pithoragarh",
    "Auli", "Chopta", "Lansdowne", "Munsyari", "Bageshwar",
    // Beach Destinations
    "Gokarna", "Udupi", "Malvan", "Tarkarli", "Daman", "Diu",
    // Hill Stations
    "Ooty", "Coonoor", "Kodaikanal", "Munnar", "Wayanad", "Idukki",
    "Darjeeling", "Kalimpong", "Kurseong", "Mirik", "Siliguri", "Gangtok",
    "Sikkim", "Mount Abu", "Udaipur", "Jodhpur", "Jaisalmer",
];

// Function to get suggestions
function getSuggestions(input) {
    if (input.length < 2) {
        return [];
    }
    const lowerInput = input.toLowerCase();
    return indianCities.filter(city => 
        city.toLowerCase().startsWith(lowerInput)
    ).slice(0, 5); // Limit to 5 suggestions
}

// Function to display suggestions
function displaySuggestions(suggestions) {
    suggestionsDiv.innerHTML = '';
    
    if (suggestions.length === 0) {
        suggestionsDiv.style.display = 'none';
        return;
    }
    
    suggestionsDiv.style.display = 'block';
    suggestions.forEach(suggestion => {
        const div = document.createElement('div');
        div.classList.add('suggestion-item');
        div.textContent = suggestion;
        div.addEventListener('click', () => {
            search.value = suggestion;
            suggestionsDiv.style.display = 'none';
            getWeatherByLocation(suggestion);
        });
        suggestionsDiv.appendChild(div);
    });
}

// Event listener for search input
search.addEventListener('input', (e) => {
    const input = e.target.value.trim();
    const suggestions = getSuggestions(input);
    displaySuggestions(suggestions);
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (e.target !== search && e.target !== suggestionsDiv) {
        suggestionsDiv.style.display = 'none';
    }
});

async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(url(city), {
            origin: "cors"
        });
        
        if (!resp.ok) {
            throw new Error('City not found');
        }
        
        const respData = await resp.json();
        addWeatherToPage(respData);
        suggestionsDiv.style.display = 'none';
    } catch (error) {
        const weather = document.createElement('div');
        weather.classList.add('weather', 'error');
        weather.innerHTML = `
            <h2>⚠️ Error</h2>
            <small>City not found. Please try another city.</small>
        `;
        main.innerHTML = "";
        main.appendChild(weather);
    }
}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `  
    <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>  
    <small>${data.weather[0].main}</small>
    <p class="city-name">${data.name}, ${data.sys.country}</p>
    <div class="weather-details">
        <div class="detail-item">
            <span class="detail-label">Feels Like</span>
            <span class="detail-value">${Ktoc(data.main.feels_like)}°C</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Humidity</span>
            <span class="detail-value">${data.main.humidity}%</span>
        </div>
        <div class="detail-item">
            <span class="detail-label">Wind Speed</span>
            <span class="detail-value">${(data.wind.speed * 3.6).toFixed(1)} km/h</span>
        </div>
    </div>
    `;
    //  cleanup   
    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value.trim();
    if (city) {
        getWeatherByLocation(city);
    }
});

const chk = document.getElementById('chk');

chk.addEventListener('change', () => {
	document.body.classList.toggle('dark');
});
