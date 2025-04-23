<?php
session_start();
header('Content-Type: application/json');

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'login_app';

$conn = new mysqli($host, $user, $password, $database);

if (!isset($_SESSION['user_id']) || !isset($_SESSION['user'])) {
    echo json_encode(['error' => 'Nie jesteś zalogowany!']);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);
$message = trim($data['message'] ?? '');

if (empty($message)) {
    echo json_encode(['error' => 'Komentarz nie może być pusty!']);
    exit();
}

$user_id = $_SESSION['user_id'];
$username = $_SESSION['user'];

$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

$stmt = $conn->prepare("INSERT INTO comments (user_id, username, message) VALUES (?, ?, ?)");
$stmt->bind_param("iss", $user_id, $username, $message);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Błąd zapisywania komentarza']);
}

$stmt->close();
$conn->close();
?>
