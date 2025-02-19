<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ustawienia</title>
    <link rel="stylesheet" href="stronaGłówna.css">
</head>
<body>
    <div class="user-profile">
        <div class="profile-icon" onclick="toggleProfileMenu()">
            <img src="user-icon.png" alt="Profil użytkownika">
        </div>
        <div class="profile-menu" id="profileMenu">
            <ul>
                <li><a href="profil.php">Profil</a></li>
                <li><a href="ustawienia.php">Ustawienia</a></li>
                <li><a href="logout.php">Wyloguj się</a></li>
            </ul>
        </div>
    </div>

    <div class="market-container">
        <div class="logo-container">
            <img src="Logo.png" alt="Logo" class="logo">
        </div>
        <h2>Ustawienia</h2>
        <p>Chcesz zmienić swoje zdjęcie profilowe?</p>

        <!-- Formularz do zmiany zdjęcia -->
        <form action="aktualizacje.php" method="POST" enctype="multipart/form-data">
            <label for="profile_picture">Wybierz nowe zdjęcie profilowe:</label>
            <input type="file" name="profile_picture" id="profile_picture" required>
            <button type="submit">Zmień zdjęcie</button>
        </form>

        <button onclick="location.href='rynek.html'" class="back-button">Powrót do rynku</button>
    </div>

    <script src="rynek.js"></script>
</body>
</html>
