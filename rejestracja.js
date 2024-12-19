const passwordInput = document.getElementById('password');
const passwordRequirements = document.getElementById('passwordRequirements');
const registerMessage = document.getElementById('registerMessage');

const lengthRequirement = document.getElementById('length');
const uppercaseRequirement = document.getElementById('uppercase');
const numberRequirement = document.getElementById('number');
const specialRequirement = document.getElementById('special');

passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;

    if (password.length >= 8) {
        lengthRequirement.classList.add('valid');
        lengthRequirement.classList.remove('invalid');
    } else {
        lengthRequirement.classList.add('invalid');
        lengthRequirement.classList.remove('valid');
    }

    if (/[A-Z]/.test(password)) {
        uppercaseRequirement.classList.add('valid');
        uppercaseRequirement.classList.remove('invalid');
    } else {
        uppercaseRequirement.classList.add('invalid');
        uppercaseRequirement.classList.remove('valid');
    }

    if (/\d/.test(password)) {
        numberRequirement.classList.add('valid');
        numberRequirement.classList.remove('invalid');
    } else {
        numberRequirement.classList.add('invalid');
        numberRequirement.classList.remove('valid');
    }

    if (/[@$!%*?&]/.test(password)) {
        specialRequirement.classList.add('valid');
        specialRequirement.classList.remove('invalid');
    } else {
        specialRequirement.classList.add('invalid');
        specialRequirement.classList.remove('valid');
    }
});

passwordInput.addEventListener('focus', () => {
    passwordRequirements.style.display = 'block';
});

passwordInput.addEventListener('blur', () => {
    passwordRequirements.style.display = 'none';
});

document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const loginInput = document.getElementById('login').value;
    const passwordInputValue = passwordInput.value;
    const confirmPasswordInput = document.getElementById('confirmPassword').value;

    if (passwordInputValue !== confirmPasswordInput) {
        registerMessage.innerText = 'Hasła nie są zgodne!';
        registerMessage.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('rejestracja.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: loginInput, password: passwordInputValue })
        });

        if (!response.ok) {
            throw new Error('Błąd komunikacji z serwerem: ' + response.status);
        }

        const result = await response.json();
        console.log(result);

        if (result.success) {
            registerMessage.innerText = 'Rejestracja zakończona sukcesem!';
            registerMessage.style.display = 'block';
            registerMessage.style.color = 'green'; 
        } else {
            registerMessage.innerText = result.message || 'Wystąpił błąd rejestracji.';
            registerMessage.style.display = 'block'; 
            registerMessage.style.color = 'red'; 
        }
    } catch (error) {
        console.error('Błąd rejestracji:', error);
        registerMessage.innerText = 'Wystąpił błąd rejestracji. Spróbuj ponownie.';
        registerMessage.style.display = 'block';
        registerMessage.style.color = 'red';
    }
});
