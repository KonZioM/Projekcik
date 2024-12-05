document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const loginInput = document.getElementById('login').value;
    const passwordInput = document.getElementById('password').value;

    const response = await fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: loginInput, password: passwordInput })
    });

    const result = await response.json();
    if (result.success) {
        window.location.href = 'rynek.html';
    } else {
        document.getElementById('loginMessage').innerText = 'Błędne dane logowania!';
    }
});