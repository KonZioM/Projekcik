<?php
session_start();
require_once 'db.php';

// Pobieranie danych użytkownika
$userId = $_SESSION['user_id'];
$stmt = $db->prepare("SELECT username, profile_picture FROM users WHERE id = ?");
$stmt->execute([$userId]);
$user = $stmt->fetch();
?>

<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profil</title>
    <link rel="stylesheet" href="stronaGłówna.css">
</head>
<body>
    <div class="user-profile">
        <div class="profile-icon">
            <img src="<?php echo $user['profile_picture'] ?: 'default-profile.png'; ?>" alt="Profil użytkownika">
        </div>
        <h2>Witaj, <?php echo htmlspecialchars($user['username']); ?>!</h2>
        <a href="ustawienia.php">Edytuj ustawienia</a>
    </div>

    <div class="market-container">
        <div class="logo-container">
            <img src="Logo.png" alt="Logo" class="logo">
        </div>
        <h2>Twój Profil</h2>
        <p><strong>Użytkownik:</strong> <?php echo htmlspecialchars($user['username']); ?></p>
        <p><strong>Zdjęcie profilowe:</strong></p>
        <img src="<?php echo $user['profile_picture'] ?: 'default-profile.png'; ?>" alt="Profil użytkownika" class="profile-img">
    </div>

    <script src="rynek.js"></script>
</body>
</html>
