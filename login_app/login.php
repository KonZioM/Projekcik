<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "login_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$login = $data['login'];
$password = $data['password'];

if (empty($login) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Login i hasło są wymagane.']);
    exit();
}

$sql = "SELECT password_hash FROM users WHERE login = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $login);
$stmt->execute();
$stmt->bind_result($passwordHash);
$stmt->fetch();
$stmt->close();

if (!$passwordHash) {
    echo json_encode(['success' => false, 'message' => 'Nie znaleziono użytkownika.']);
    exit();
}

if (password_verify($password, $passwordHash)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Błędne dane logowania!']);
}

$conn->close();
?>
