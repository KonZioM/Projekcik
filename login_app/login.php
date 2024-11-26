<?php
header('Content-Type: application/json');

$db_host = 'localhost';
$db_user = 'root'; // Domyślny użytkownik MySQL w XAMPP
$db_password = '';
$db_name = 'login_app';

// Połączenie z bazą danych MySQL
$conn = new mysqli($db_host, $db_user, $db_password, $db_name);

// Sprawdzanie połączenia
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Błąd połączenia z bazą danych.']));
}

// Pobranie danych z żądania POST
$data = json_decode(file_get_contents('php://input'), true);
$login = $data['login'];
$password = $data['password'];

// Weryfikacja loginu i hasła w bazie danych
$stmt = $conn->prepare('SELECT * FROM users WHERE login = ? AND password = ?');
$stmt->bind_param('ss', $login, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode(['success' => true, 'message' => 'Logowanie udane!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Nieprawidłowy login lub hasło.']);
}

$stmt->close();
$conn->close();
?>
