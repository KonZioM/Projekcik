document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const loginInput = document.getElementById("login").value;
    const passwordInput = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    // Wymyślone dane logowania (możesz je zmienić na dowolne inne)
    const correctLogin = "admin";
    const correctPassword = "1234";

    if (loginInput === correctLogin && passwordInput === correctPassword) {
        loginMessage.style.color = "green";
        loginMessage.textContent = "Logowanie udane!";
        // Tutaj możesz dodać przekierowanie lub inną akcję po udanym logowaniu
    } else {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Błędny login lub hasło. Spróbuj ponownie.";
    }
});
