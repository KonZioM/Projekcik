document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    let darkModeCSS = null;

    // Funkcja do załączania/odłączania dark-mode.css
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

    // Sprawdź, czy preferencja trybu ciemnego jest zapisana w localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

    // Ustaw początkowy stan trybu ciemnego
    if (isDarkMode) {
        body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.checked = true;
        }
        toggleDarkModeCSS(true); // Załącz dark-mode.css
    }

    // Funkcja do przełączania trybu ciemnego
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        const darkModeEnabled = body.classList.contains('dark-mode');

        // Zapisz preferencję w localStorage
        localStorage.setItem('darkMode', darkModeEnabled ? 'enabled' : 'disabled');

        toggleDarkModeCSS(darkModeEnabled); // Załącz/odłącz dark-mode.css
    }

    // Obsługa zmiany stanu przełącznika
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }
});
