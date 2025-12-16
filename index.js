const apiKey = "d8597e7e710d81e402869e136f261268";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const suggestionsDiv = document.getElementById('suggestions');
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

// Indian cities and areas dataset - Comprehensive list with major areas, famous stations, and landmarks
const indianCities = [
    // Major Metropolitan Cities
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad",
    
    // Mumbai Areas & Suburbs
    "Bandra", "Andheri", "Dadar", "Fort", "Colaba", "Worli", "Navi Mumbai", "Thane", "Mira Road", "Borivali",
    "Mulund", "Malad", "Goregaon", "Powai", "Tardeo", "Mahim", "Kala Ghoda", "Marine Drive",
    
    // Delhi Areas & Nearby
    "Central Delhi", "South Delhi", "East Delhi", "West Delhi", "North Delhi", "Noida", "Gurgaon", "Ghaziabad",
    "Connaught Place", "Dwarka", "Karol Bagh", "Kalkaji", "Mayur Vihar", "Lajpat Nagar", "Chandni Chowk",
    "Saket", "Safdarjung", "Vasant Kunj", "Aerocity", "Gurugram", "Faridabad", "Greater Noida",
    
    // Bangalore Areas
    "Whitefield", "Indiranagar", "Koramangala", "MG Road", "Bellandur", "Jayanagar", "Malleshwaram", "Ulsoor",
    "Marathahalli", "Frazer Town", "Lavelle Road", "Residency Road", "Ulsoor Lake", "Richmond Town",
    
    // Hyderabad Areas
    "Banjara Hills", "Secunderabad", "Jubilee Hills", "Gachibowli", "HITEC City", "Somajiguda", "Ameerpet",
    "Kukatpally", "Dilsukhnagar", "Nampally", "Begumpet", "Abids", "Charminar",
    
    // Chennai Areas
    "Mylapore", "T Nagar", "Adyar", "Guindy", "Egmore", "Nungambakkam", "Alwarpet", "Besant Nagar",
    "Kodambakkam", "Valasaravakkam", "Ashok Nagar", "Velachery", "Porur", "Ambattur",
    
    // Kolkata Areas
    "Alipore", "Ballygunge", "Behala", "Salt Lake", "Jadavpur", "Park Circus", "Esplanade", "Sealdah",
    "Howrah", "Kasba", "Kalighat", "Dakshineswar", "Rashbehari", "Rabindra Sarovar",
    
    // Pune Areas
    "Koregaon Park", "Viman Nagar", "Hadapsar", "Kharadi", "Baner", "Shivajinagar", "Deccan", "Pimpri",
    "Camp", "Aundh", "Wakad", "Magarpatta", "Undri", "Bavdhan",
    
    // Ahmedabad Areas
    "Navrangpura", "Mithakhali", "Vastrapur", "Satellite", "Maninagar", "Khanpur", "Thaltej", "Ramdev Nagar",
    "SG Highway", "Chandkheda", "Nikol", "Iscon", "Vesu",
    
    // Jaipur Areas
    "C Scheme", "D Scheme", "M I Road", "Amar Colony", "Bani Park", "Tonk Road", "Mansarovar",
    "Sitapura", "Jyoti Nagar", "Malviya Nagar",
    
    // Surat Areas
    "Adajan", "Vesu", "Athwalines", "Rander", "Katargam", "Pal", "Piplod",
    
    // Lucknow Areas
    "Gomti Nagar", "Aliganj", "Mahanagar", "Naka Hindola", "Charbagh", "Lucknow Central",
    
    // Popular Markets & Shopping Districts
    "Bandra Hill Road", "Linking Road", "Phoenix Mills", "South Extension", "GK Market", "Defense Colony",
    "Palika Bazaar", "Sarojini Nagar", "Nehrü Place", "CP Delhi", "Dilli Haat", "Lajpat Nagar Market",
    "Chor Bazaar", "Dadar Market", "Crawford Market", "New Market Kolkata", "Chickpet Bangalore",
    "Commercial Street", "Brigade Road", "Pondy Bazaar", "Spencer Plaza", "Meenakshi Tower",
    
    // Sports Venues & Stadiums
    "Eden Gardens", "MCG Kolkata", "Wankhede Stadium", "Chinnaswamy Stadium", "Arun Jaitley Stadium",
    "Rajiv Gandhi Stadium", "Narendra Modi Stadium", "Holkar Stadium", "Feroz Shah Kotla",
    "Chepauk Stadium", "JSCA Stadium", "Sher-e-Bangla Stadium",
    
    // Universities & Educational Hubs
    "IIT Delhi", "IIT Bombay", "IIT Madras", "Delhi University", "Jawaharlal Nehru University",
    "Savitribai Phule Pune", "Banaras Hindu University", "Anna University", "IIM Ahmedabad",
    
    // Hospitals & Medical Centers
    "Apollo Bangalore", "Fortis Chennai", "Max Healthcare", "Lilavati Hospital", "AIIMS Delhi",
    "PGI Chandigarh", "CMC Vellore",
    
    // Tech & Business Hubs
    "Cyber City Gurgaon", "DLF Cyber Hub", "Whitefield Tech Park", "Film City Mumbai", "DSIR New Delhi",
    "Raipur IT Park", "Pune Tech Park", "Bangalore Tech Park",
    
    // Other Major Cities
    "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal", "Visakhapatnam", "Patna", "Vadodara",
    "Nashik", "Aurangabad", "Solapur", "Nagpur", "Chandigarh", "Coimbatore", "Kochi",
    
    // Northern Region - Uttar Pradesh
    "Agra", "Varanasi", "Meerut", "Allahabad", "Mirzapur", "Jhansi", "Gwalior", "Kanpur", "Lucknow",
    "Mathura", "Vrindavan", "Noida City Center", "Taj Mahal", "Varanasi Ghats",
    "Kashi Vishwanath", "Sarnath", "Chunar Fort", "Ayodhya", "Varanasi Railway Station",
    
    // Northern Region - Himachal Pradesh
    "Shimla", "Manali", "Dharamshala", "Kasol", "Kufri", "Dalhousie", "Chamba", "Tosh", "Bhuntar",
    "McLeod Ganj", "Palampur", "Kullu", "Mandi", "Kinnaur", "Spiti",
    "Jibhi", "Bir", "Pragpur", "Chail", "Khajjiar",
    
    // Northern Region - Jammu & Kashmir
    "Srinagar", "Jammu", "Leh", "Ladakh", "Gulmarg", "Pahalgam", "Sonamarg", "Anantnag",
    "Baramulla", "Sopore", "Kupwara", "Kargil", "Nubra Valley", "Pangong Tso",
    "Dal Lake", "Mughal Gardens", "Nishat Bagh", "Shankaracharya Temple",
    
    // Northern Region - Punjab
    "Amritsar", "Ludhiana", "Chandigarh", "Jalandhar", "Patiala", "Bathinda", "Golden Temple",
    "Mohali", "Pathankot", "Hoshiarpur", "Barnala", "Mansa", "Fatehgarh Sahib",
    "Jallianwala Bagh", "Wagah Border",
    
    // Northern Region - Uttarakhand
    "Dehradun", "Nainital", "Mussoorie", "Rishikesh", "Almora", "Ranikhet", "Pithoragarh", "Chopta",
    "Auli", "Lansdowne", "Munsyari", "Bageshwar", "Kausani", "Haridwar",
    "Shivpuri", "Corbett National Park", "Roopkund", "Valley of Flowers",
    
    // Northern Region - Haryana
    "Gurgaon", "Faridabad", "Hisar", "Rohtak", "Panipat", "Karnal", "Ambala", "Yamunanagar",
    "Panchkula", "Sonipat", "Bhiwani", "Jind",
    
    // Western Region - Gujarat
    "Rajkot", "Vadodara", "Surat", "Bhavnagar", "Ahmedabad", "Anand", "Gandhinagar", "Baroda",
    "Porbandar", "Jamnagar", "Junagadh", "Morbi", "Gondal", "Mehsana", "Kheda",
    "Statue of Unity", "Sabarmati Ashram", "Rani Ki Vav", "Modhera Sun Temple",
    
    // Western Region - Rajasthan
    "Jaipur", "Jodhpur", "Jaisalmer", "Udaipur", "Mount Abu", "Pushkar", "Bikaner", "Ajmer",
    "Kota", "Chittorgarh", "Dungarpur", "Banswara", "Tonk", "Sikar",
    "Hawa Mahal", "City Palace", "Mehrangarh Fort", "Desert Camp", "Lake Palace",
    "Dilwara Temples", "Nahargarh Fort", "Ranthambore Fort",
    
    // Western Region - Goa
    "Panaji", "Vasco da Gama", "Margao", "Calangute", "Baga", "Anjuna", "Arambol", "Palolem",
    "Candolim", "Miramar", "Dona Paula", "Fort Aguada", "Basilica of Bom Jesus",
    
    // Western Region - Maharashtra
    "Mumbai", "Pune", "Aurangabad", "Nashik", "Solapur", "Nagpur", "Mahabaleshwar", "Lonavala",
    "Shirdi", "Matheran", "Kolhapur", "Sangli", "Satara", "Ratnagiri", "Sindhudurg",
    "Ajanta Caves", "Ellora Caves", "Panchgani",
    
    // Southern Region - Karnataka
    "Bangalore", "Mysore", "Mangalore", "Hubli", "Dharwad", "Belgaum", "Udupi", "Coorg",
    "Hassan", "Shimoga", "Chikmagalur", "Kodagu", "Jog Falls", "Tumkur", "Davangere",
    "Raichur", "Bijapur", "Gulbarga", "Bagalkot", "Hospet",
    "Mysore Palace", "Vidhana Soudha", "Hampi Ruins", "Halebidu Temples",
    
    // Southern Region - Tamil Nadu
    "Chennai", "Madurai", "Salem", "Coimbatore", "Tirupati", "Trichy", "Tirunelveli", "Kanyakumari",
    "Ooty", "Coonoor", "Kodaikanal", "Thanjavur", "Kumbakonam", "Erode", "Dindigul",
    "Vellore", "Kanchipuram", "Rameshwaram", "Tanjore", "Nagercoil",
    "Tirupati Temple", "Meenakshi Temple", "Brihadeeswarar Temple", "Marina Beach",
    
    // Southern Region - Telangana
    "Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Ramagundam", "Mahbubnagar",
    "Khammam", "Adilabad", "Charminar", "Mecca Masjid",
    
    // Southern Region - Andhra Pradesh
    "Visakhapatnam", "Vijayawada", "Tirupati", "Kakinada", "Rajahmundry", "Guntur", "Nellore", "Ongole",
    "Chittoor", "Kadapa", "Anantapur", "Kurnool", "Tenali", "Machilipatnam",
    "Tirupati Temple", "Tirupati Balaji", "Vizag Port", "Araku Valley",
    
    // Southern Region - Kerala
    "Kochi", "Thrissur", "Kannur", "Calicut", "Kottayam", "Alappuzha", "Thiruvananthapuram",
    "Ernakulam", "Wayanad", "Idukki", "Malappuram", "Pathanamthitta", "Kollam", "Munnar",
    "Thekkady", "Alleppey Backwaters", "Fort Kochi", "Mattancherry", "Kumarakom",
    "Varkala", "Kovalam", "Gokarna", "Lakshadweep", "Periyar National Park",
    
    // Eastern Region - West Bengal
    "Kolkata", "Darjeeling", "Kalimpong", "Siliguri", "Kurseong", "Mirik", "Malda", "Asansol",
    "Durgapur", "Jalpaiguri", "Bolpur", "Shantiniketan", "Darjeeling Tea Gardens",
    "Hooghly", "Medinipur", "Cooch Behar", "Nabadwip", "Nalanda University Site",
    "Victoria Memorial", "Howrah Bridge", "Rabindranath Tagore House",
    
    // Eastern Region - Bihar
    "Patna", "Ranchi", "Gaya", "Bhagalpur", "Jamshedpur", "Jharia", "Darbhanga", "Muzaffarpur",
    "Bodh Gaya", "Nalanda", "Vaishali", "Madhubani", "Muzzafarpur", "Buxar",
    "Mahatma Gandhi Setu", "Mahabodhi Temple", "Nalanda University Ruins",
    
    // Eastern Region - Odisha
    "Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Puri", "Konark", "Berhampur", "Jharsuguda",
    "Dhenkanal", "Angul", "Balangir", "Nuapada", "Baragarh",
    "Jagannath Temple", "Konark Sun Temple", "Chilika Lake", "Odisha Museum",
    
    // Eastern Region - Jharkhand
    "Ranchi", "Jamshedpur", "Giridih", "Hazaribagh", "Dhanbad", "Bokaro", "Dumariaon", "Lohardaga",
    "Deoghar", "Dumka", "Godda", "Koderma", "Pakur",
    "Jamshedpur Steel City", "Jamshedpur Tata Steel",
    
    // Northeast Region - Assam
    "Guwahati", "Silchar", "Dibrugarh", "Tezpur", "Nagaon", "Barpeta", "Kaziranga", "Manas National Park",
    "Jorhat", "Golaghat", "Sonitpur", "Darrang", "Nalbari",
    "Brahmaputra River", "Kaziranga National Park", "Manas Tiger Reserve",
    
    // Northeast Region - Meghalaya
    "Shillong", "Cherrapunji", "Mawsynram", "Tura", "Jowai", "Bagmara", "Nongpoh",
    "Khasi Hills", "Mawlynnong", "Living Root Bridges",
    
    // Northeast Region - Tripura
    "Agartala", "Udaipur", "Kailashahar", "Dharmanagar", "Ambassa", "Karimganj",
    "Ujjayanta Palace",
    
    // Northeast Region - Mizoram
    "Aizawl", "Lunglei", "Saiha", "Champhai", "Serchhip", "Kolasib",
    
    // Northeast Region - Nagaland
    "Kohima", "Dimapur", "Mokokchung", "Wokha", "Zunheboto", "Phek",
    "Hornbill Festival",
    
    // Northeast Region - Manipur
    "Imphal", "Ukhrul", "Churachandpur", "Bishnupur", "Thoubal", "Moirang",
    "Loktak Lake", "Kangla Fort", "Loktak Fish Farm",
    
    // Northeast Region - Sikkim
    "Gangtok", "Sikkim", "Pelling", "Namchi", "Pakyong", "Lachung", "Ravangla",
    "Lachen", "Rumtek Monastery", "Kanyedan Lachung", "Singalila Ridge",
    
    // Northeast Region - Arunachal Pradesh
    "Itanagar", "Ziro", "Tawang", "Along", "Pasighat", "Bomdila", "Naharlagun",
    "Tawang Monastery", "Ziro Valley", "Sela Pass",
    
    // Union Territories
    "Pondicherry", "Yanam", "Karaikal", "Mahe", "Lakshadweep", "Andaman", "Nicobar", "Port Blair",
    "Chandni Chowk", "Raisina Hill", "Connaught Place", "India Gate",
    "Cellular Jail", "Havelock Island", "Neil Island",
    
    // Famous Stations & Landmarks
    "Grand Central", "Chhatrapati Terminus", "New Delhi Station", "Howrah Station", "Egmore Station",
    "Victoria Terminus", "Taj Mahal", "India Gate", "Red Fort", "Gateway of India",
    "Raj Ghat", "Jama Masjid", "Qutub Minar", "Humayun Tomb", "Rashtrapati Bhavan",
    
    // Beach Destinations & Coastal Areas
    "Gokarna", "Malvan", "Tarkarli", "Daman", "Diu", "Kovalam", "Varkala", "Halebidu",
    "Hampi", "Hawa Mahal", "Jog Falls", "Nilgiri Mountain Railway", "Agatti Island",
    "Radhanagar Beach", "Elephant Beach", "Coral Island",
    
    // Hill Stations & Scenic Areas
    "Ooty", "Coonoor", "Kodaikanal", "Munnar", "Wayanad", "Coorg", "Chikmagalur",
    "Yercaud", "Athamalai", "Nandi Hills", "Sakleshpur", "Kemmannu", "Saputara",
    "Matheran", "Mahabaleshwar", "Panchgani", "Lonavala", "Khandala",
    
    // News-worthy & Frequently Mentioned Places
    "Indore City", "Swachh Bharat Mission", "Smart Cities", "Gujarat Titans", "IPL Venues",
    "Startup India Hubs", "Make in India Zones", "Clean India Campaign",
    "Census 2021 Sites", "Vaccination Centers", "Metro Stations",
    "Maharaja Express", "Incredible India", "Digital India Centers",
];

// Function to get suggestions
function getSuggestions(input) {
    if (input.length < 2) {
        return [];
    }
    const lowerInput = input.toLowerCase();
    return indianCities.filter(city => 
        city.toLowerCase().startsWith(lowerInput)
    ).slice(0, 8); // Limit to 8 suggestions
}

// Function to get suggestions
function getSuggestions(input) {
    if (input.length < 2) {
        return [];
    }
    const lowerInput = input.toLowerCase();
    return indianCities.filter(city => 
        city.toLowerCase().startsWith(lowerInput)
    ).slice(0, 8); // Increased to 8 suggestions
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
