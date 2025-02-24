<?php
session_start();
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'login_app';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Błąd połączenia z bazą danych: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$currentPassword = $data['currentPassword'];
$newPassword = $data['newPassword'];

if (empty($currentPassword) || empty($newPassword)) {
    echo json_encode(['success' => false, 'message' => 'Wypełnij wszystkie pola!']);
    exit();
}

// Pobierz login użytkownika z sesji
if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'Użytkownik niezalogowany.']);
    exit();
}

$login = $_SESSION['user'];

// Pobierz aktualne hasło z bazy danych
$sql = "SELECT password_hash FROM users WHERE login = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $login);
$stmt->execute();
$stmt->bind_result($passwordHash);
$stmt->fetch();
$stmt->close();

// Sprawdź, czy aktualne hasło jest poprawne
if (!password_verify($currentPassword, $passwordHash)) {
    echo json_encode(['success' => false, 'message' => 'Aktualne hasło jest nieprawidłowe.']);
    exit();
}

// Zaktualizuj hasło w bazie danych
$newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
$sql = "UPDATE users SET password_hash = ? WHERE login = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $newPasswordHash, $login);
$result = $stmt->execute();

if ($result) {
    echo json_encode(['success' => true, 'message' => 'Hasło zostało zmienione!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Wystąpił błąd podczas zmiany hasła.']);
}

$stmt->close();
$conn->close();
?>