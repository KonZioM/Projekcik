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
    die(json_encode(['success' => false, 'message' => 'Błąd połączenia z bazą danych']));
}

$data = json_decode(file_get_contents("php://input"), true);
$login = $data['login'] ?? '';
$password = $data['password'] ?? '';

if (empty($login) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Wypełnij wszystkie pola!']);
    exit();
}

$sql = "SELECT id, password_hash FROM users WHERE login = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $login);
$stmt->execute();
$stmt->bind_result($userId, $passwordHash);
$stmt->fetch();

if (!$passwordHash) {
    echo json_encode(['success' => false, 'message' => 'Nieprawidłowe dane logowania']);
    exit();
}

if (password_verify($password, $passwordHash)) {
    $_SESSION['user'] = $login;
    $_SESSION['user_id'] = $userId;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Nieprawidłowe hasło']);
}

$stmt->close();
$conn->close();
?>
