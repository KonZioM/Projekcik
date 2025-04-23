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
    die(json_encode(['success' => false, 'message' => 'Błąd połączenia z bazą danych: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"), true);
$currentPassword = $data['currentPassword'] ?? '';
$newPassword = $data['newPassword'] ?? '';

if (empty($currentPassword) || empty($newPassword)) {
    echo json_encode(['success' => false, 'message' => 'Wypełnij wszystkie pola!']);
    exit();
}

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'message' => 'Użytkownik niezalogowany.']);
    exit();
}

$userId = $_SESSION['user_id'];

$sql = "SELECT password_hash FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userId);
$stmt->execute();
$stmt->bind_result($passwordHash);
$stmt->fetch();
$stmt->close();

if (!$passwordHash) {
    echo json_encode(['success' => false, 'message' => 'Nie znaleziono użytkownika w bazie danych.']);
    exit();
}

if (!password_verify($currentPassword, $passwordHash)) {
    echo json_encode(['success' => false, 'message' => 'Aktualne hasło jest nieprawidłowe.']);
    exit();
}

if (strlen($newPassword) < 6 || !preg_match('/[A-Z]/', $newPassword) || !preg_match('/[0-9]/', $newPassword)) {
    echo json_encode(['success' => false, 'message' => 'Nowe hasło musi mieć co najmniej 6 znaków, 1 wielką literę i 1 cyfrę!']);
    exit();
}

$newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);

$sql = "UPDATE users SET password_hash = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $newPasswordHash, $userId);

if ($stmt->execute()) {
    $action = "Zmiana hasła";
    $sql_activity = "INSERT INTO user_activity (user_id, action) VALUES (?, ?)";
    $stmt_activity = $conn->prepare($sql_activity);
    $stmt_activity->bind_param("is", $userId, $action);
    $stmt_activity->execute();
    $stmt_activity->close();

    echo json_encode(['success' => true, 'message' => 'Hasło zostało zmienione!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Wystąpił błąd podczas zmiany hasła.']);
}

$stmt->close();
$conn->close();
?>
