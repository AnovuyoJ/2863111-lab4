

const searchBtn = document.getElementById('search-btn');
const countryInput = document.getElementById('country-input');
const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');
const loadingSpinner = document.getElementById('loading-spinner');
const errorMessage = document.getElementById('error-message');



document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});

countryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const countryName = countryInput.value.trim();
        if (countryName) {
            searchCountry(countryName);
        }
    }
});

async function searchCountry(countryName) {
    try {
        // Show loading spinner
        loadingSpinner.style.display = 'block';
        errorMessage.textContent = '';
        countryInfo.innerHTML = '';
        borderingCountries.innerHTML = '';
        
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) {
            throw new Error('Country not found');
        }
        const data = await response.json();
        const country = data[0];
        // Update DOM with country info
        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <P><strong>Official Name:</strong> ${country.name.official}</p>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        // Fetch bordering countries
        if (country.borders) {
            const borderCodes = country.borders.join(',');
            const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borderCodes}`);
            const borderData = await borderResponse.json();
            borderingCountries.innerHTML = '<h1>Bordering Countries:</h1>';
            borderData.forEach(borderCountry => {
                borderingCountries.innerHTML += `
                    <div class="border-country">
                        <h2>${borderCountry.cca3}</h2>
                        <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag">
                    </div>
                `;
            });
        } else {
            borderingCountries.innerHTML = '<p>No bordering countries.</p>';
        }
    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        // Hide loading spinner
        loadingSpinner.style.display = 'none';
    }
}       






