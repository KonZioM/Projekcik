const apiKey = '00HG5ZI4XSCD3MAO';

document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    let darkModeCSS = null;

    function toggleDarkModeCSS(enabled) {
        if (enabled && !darkModeCSS) {
            darkModeCSS = document.createElement('link');
            darkModeCSS.rel = 'stylesheet';
            darkModeCSS.href = 'dark-mode.css';
            document.head.appendChild(darkModeCSS);
        } else if (!enabled && darkModeCSS) {
            darkModeCSS.remove();
            darkModeCSS = null;
        }
    }

    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    if (isDarkMode) {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
        toggleDarkModeCSS(true); 
    }

    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const darkModeEnabled = body.classList.contains('dark-mode');

        localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');

        toggleDarkModeCSS(darkModeEnabled); 
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }
});

function showWarning(message) {
    const existingWarning = document.querySelector('.warning');
    if (existingWarning) {
        existingWarning.remove();
    }

    const warningDiv = document.createElement('div');
    warningDiv.className = 'warning';
    warningDiv.textContent = message;

    warningDiv.style.backgroundColor = '#ffcc00';
    warningDiv.style.color = '#000';
    warningDiv.style.padding = '10px';
    warningDiv.style.textAlign = 'center';
    warningDiv.style.position = 'fixed';
    warningDiv.style.top = '0';
    warningDiv.style.left = '0';
    warningDiv.style.right = '0';
    warningDiv.style.zIndex = '1000';

    document.body.prepend(warningDiv);

    setTimeout(() => {
        warningDiv.remove();
    }, 5000);
}

async function fetchMarketData() {
    const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.top_gainers && data.top_losers) {
            await saveMarketData(data.top_gainers, 'gain');
            await saveMarketData(data.top_losers, 'loss');

            updateTopGainers(data.top_gainers);
            updateTopDecliners(data.top_losers);
        } else {
            console.error('Błąd pobierania danych z API:', data);
            showWarning('Uwaga: Dane są pobierane z bazy danych z powodu błędu API.');
            await loadMarketDataFromDatabase();
        }
    } catch (error) {
        console.error('Błąd podczas pobierania danych z API:', error);
        showWarning('Uwaga: Dane są pobierane z bazy danych z powodu błędu połączenia z API.');
        await loadMarketDataFromDatabase();
    }
}

async function loadMarketDataFromDatabase() {
    try {
        const response = await fetch('get_market_data.php');
        const data = await response.json();

        if (data.success) {
            updateTopGainers(data.gainers);
            updateTopDecliners(data.losers);
        } else {
            console.error('Błąd pobierania danych z bazy danych:', data.message);
        }
    } catch (error) {
        console.error('Błąd podczas pobierania danych z bazy danych:', error);
    }
}

async function saveMarketData(data, type) {
    try {
        console.log('Wysyłane dane:', { data, type });

        const response = await fetch('save_market_data.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data, type })
        });

        const result = await response.json();
        console.log('Odpowiedź z PHP:', result);

        if (!result.success) {
            console.error('Błąd zapisywania danych:', result.message);
        }
    } catch (error) {
        console.error('Błąd podczas zapisywania danych:', error);
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

function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', (e) => {
    const profileMenu = document.getElementById('profileMenu');
    const profileIcon = document.querySelector('.profile-icon');
    
    if (!profileIcon.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('profileMenu').style.display = 'none';
});

fetchMarketData();
setInterval(fetchMarketData, 5 * 60 * 1000);
