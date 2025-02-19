<?php
session_start(); // Startuje sesję użytkownika

// Sprawdź, czy użytkownik jest zalogowany
if (!isset($_SESSION['user_id'])) {
    die("Musisz być zalogowany, aby zmienić zdjęcie profilowe.");
}

// Połączenie z bazą danych
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login_app"; // Zamień na swoją nazwę bazy danych

$conn = new mysqli($servername, $username, $password, $dbname);

// Sprawdź połączenie
if ($conn->connect_error) {
    die("Błąd połączenia z bazą danych: " . $conn->connect_error);
}

// Sprawdź, czy plik został przesłany
if (isset($_FILES['profile_picture']) && $_FILES['profile_picture']['error'] == UPLOAD_ERR_OK) {
    $user_id = $_SESSION['user_id']; // ID zalogowanego użytkownika
    $file = $_FILES['profile_picture'];
    $upload_dir = "uploads/"; // Katalog do przechowywania zdjęć
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
    
    // Sprawdź typ pliku
    if (!in_array($file['type'], $allowed_types)) {
        die("Nieobsługiwany format pliku. Dozwolone formaty: JPEG, PNG, GIF.");
    }
    
    // Generowanie unikalnej nazwy pliku
    $file_ext = pathinfo($file['name'], PATHINFO_EXTENSION);
    $new_file_name = uniqid() . "." . $file_ext;
    $upload_path = $upload_dir . $new_file_name;
    
    // Tworzenie folderu uploads, jeśli nie istnieje
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }
    
    // Przenieś plik do katalogu docelowego
    if (move_uploaded_file($file['tmp_name'], $upload_path)) {
        // Zapisz ścieżkę pliku w bazie danych
        $sql = "UPDATE users SET profile_picture = ? WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("si", $upload_path, $user_id);
        
        if ($stmt->execute()) {
            echo "Zdjęcie profilowe zostało zaktualizowane!";
            echo '<br><a href="ustawienia.html">Powrót do ustawień</a>';
        } else {
            echo "Błąd podczas aktualizacji bazy danych: " . $conn->error;
        }
        
        $stmt->close();
    } else {
        echo "Błąd podczas przesyłania pliku.";
    }
} else {
    echo "Nie przesłano pliku.";
}

$conn->close();
?>
