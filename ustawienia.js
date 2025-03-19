document.addEventListener('DOMContentLoaded', () => {
    const changePasswordForm = document.getElementById('changePasswordForm');
    const changePasswordMessage = document.getElementById('changePasswordMessage');

    changePasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        // Walidacja
        if (newPassword !== confirmNewPassword) {
            changePasswordMessage.textContent = 'Nowe hasła nie są zgodne!';
            changePasswordMessage.style.color = 'red';
            return;
        }

        if (newPassword.length < 6) {
            changePasswordMessage.textContent = 'Nowe hasło musi mieć co najmniej 6 znaków!';
            changePasswordMessage.style.color = 'red';
            return;
        }

        try {
            // Wyślij dane do serwera
            const response = await fetch('change_password.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword
                })
            });

            const result = await response.json();

            if (result.success) {
                changePasswordMessage.textContent = 'Hasło zostało zmienione!';
                changePasswordMessage.style.color = 'green';
                changePasswordForm.reset(); // Wyczyść formularz
            } else {
                changePasswordMessage.textContent = result.message || 'Wystąpił błąd podczas zmiany hasła.';
                changePasswordMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Błąd:', error);
            changePasswordMessage.textContent = 'Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie.';
            changePasswordMessage.style.color = 'red';
        }
    });
});
