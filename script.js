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

    function setThemeBasedOnSystemPreference() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        body.classList.toggle('dark-mode', isDarkMode);
        toggleDarkModeCSS(isDarkMode);
        if (darkModeToggle) {
            darkModeToggle.checked = isDarkMode;
        }
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    }

    // Ustaw początkowy motyw na podstawie preferencji systemu
    setThemeBasedOnSystemPreference();

    // Nasłuchuj zmian preferencji systemowych
    window.matchMedia('(prefers-color-scheme: dark)').addListener(setThemeBasedOnSystemPreference);

    // Obsługa ręcznego przełączania motywu
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            body.classList.toggle('dark-mode');
            const darkModeEnabled = body.classList.contains('dark-mode');
            toggleDarkModeCSS(darkModeEnabled);
            localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');
        });
    }
});
