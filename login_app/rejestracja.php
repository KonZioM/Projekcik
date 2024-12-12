<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'login_app'; // Poprawiona nazwa bazy danych

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Błąd połączenia z bazą danych: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);
$login = $data['login'];
$password = $data['password'];

if (empty($login) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Login i hasło są wymagane.']);
    exit();
}

$sql_check = "SELECT id FROM users WHERE login = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $login);
$stmt_check->execute();
$stmt_check->store_result();

if ($stmt_check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Użytkownik o podanym loginie już istnieje.']);
    $stmt_check->close();
    $conn->close();
    exit();
}

$stmt_check->close();

$hashedPassword = password_hash($password, PASSWORD_DEFAULT); // Hashowanie hasła

$sql = "INSERT INTO users (login, password_hash) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $login, $hashedPassword);
$result = $stmt->execute();

if ($result) {
    echo json_encode(['success' => true, 'message' => 'Rejestracja powiodła się!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Wystąpił błąd rejestracji: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
