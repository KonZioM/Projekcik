document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const loginInput = document.getElementById('login').value;
    const passwordInput = document.getElementById('password').value;
    const confirmPasswordInput = document.getElementById('confirmPassword').value;

    if (passwordInput !== confirmPasswordInput) {
        document.getElementById('registerMessage').innerText = 'Hasła nie są zgodne!';
        return;
    }

    try {
        const response = await fetch('rejestracja.php', {
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
            document.getElementById('registerMessage').innerText = 'Rejestracja zakończona sukcesem!';
        } else {
            document.getElementById('registerMessage').innerText = result.message || 'Wystąpił błąd rejestracji.';
        }
    } catch (error) {
        console.error('Błąd rejestracji:', error);
        document.getElementById('registerMessage').innerText = 'Wystąpił błąd rejestracji. Spróbuj ponownie.';
    }
});
