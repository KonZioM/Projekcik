const apiKey = 'ACY77SMH9KF3VXJE';

async function fetchMarketData() {
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.top_gainers && data.top_losers) {
            updateTopGainers(data.top_gainers);
            updateTopDecliners(data.top_losers);
        } else {
            console.error('Błąd pobierania danych:', data);
        }
    } catch (error) {
        console.error('Błąd podczas pobierania danych:', error);
    }
}

function updateTopGainers(gainers) {
    const gainersList = document.getElementById('top-gainers-list');
    gainersList.innerHTML = '';

    gainers.slice(0, 5).forEach(gainer => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="ticker">${gainer.ticker}</span>
            <span class="positive">${gainer.price} (+${gainer.change_percentage})</span>
        `;
        gainersList.appendChild(li);
    });
}

function updateTopDecliners(decliners) {
    const declinersList = document.getElementById('top-decliners-list');
    declinersList.innerHTML = '';

    decliners.slice(0, 5).forEach(decliner => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="ticker">${decliner.ticker}</span>
            <span class="negative">${decliner.price} (${decliner.change_percentage})</span>
        `;
        declinersList.appendChild(li);
    });
}

fetchMarketData();
setInterval(fetchMarketData, 5 * 60 * 1000);

function toggleProfileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu.style.display === 'block') {
        profileMenu.style.display = 'none';
    } else {
        profileMenu.style.display = 'block';
    }
}

// Zamknij menu, jeśli kliknięto poza nim
document.addEventListener('click', (event) => {
    const profileMenu = document.getElementById('profileMenu');
    const profileIcon = document.querySelector('.profile-icon');
    if (!profileIcon.contains(event.target) && !profileMenu.contains(event.target)) {
        profileMenu.style.display = 'none';
    }
});

// Funkcja do pokazywania/ukrywania menu profilu
function toggleProfileMenu() {
    const profileMenu = document.getElementById('profileMenu');
    if (profileMenu.style.display === 'block') {
        profileMenu.style.display = 'none';
    } else {
        profileMenu.style.display = 'block';
    }
}

