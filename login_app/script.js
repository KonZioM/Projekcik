document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const loginInput = document.getElementById('login').value;
    const passwordInput = document.getElementById('password').value;

    try {
        const response = await fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: loginInput, password: passwordInput })
        });

        if (!response.ok) {
            throw new Error('Błąd komunikacji z serwerem: ' + response.status);
        }

        const result = await response.json();
        console.log(result);

        if (result.success) {
            window.location.href = 'rynek.html';
        } else {
            document.getElementById('loginMessage').innerText = result.message || 'Błędne dane logowania!';
        }
    } catch (error) {
        console.error('Błąd logowania:', error);
        document.getElementById('loginMessage').innerText = 'Wystąpił błąd logowania. Spróbuj ponownie.';
    }
});