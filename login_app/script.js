document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const loginInput = document.getElementById("login").value;
    const passwordInput = document.getElementById("password").value;
    const loginMessage = document.getElementById("loginMessage");

    try {
        const response = await fetch("login.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ login: loginInput, password: passwordInput })
        });

        const result = await response.json();
        if (result.success) {
            loginMessage.style.color = "green";
            loginMessage.textContent = result.message;
        } else {
            loginMessage.style.color = "red";
            loginMessage.textContent = result.message;
        }
    } catch (error) {
        loginMessage.style.color = "red";
        loginMessage.textContent = "Błąd serwera. Spróbuj ponownie później.";
    }
});
