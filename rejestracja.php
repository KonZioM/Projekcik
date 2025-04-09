<?php
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
$login = $data['login'] ?? '';
$password = $data['password'] ?? '';

if (empty($login) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Login i hasło są wymagane.']);
    exit();
}

if (!preg_match('/^(?=.*[A-Z])(?=.*\d).{6,}$/', $password)) {
    echo json_encode(['success' => false, 'message' => 'Hasło musi mieć co najmniej 6 znaków, 1 cyfrę i 1 dużą literę!']);
    exit();
}

$sql_check = "SELECT id FROM users WHERE login = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $login);
$stmt_check->execute();
$stmt_check->store_result();

if ($stmt_check->num_rows > 0) {
    echo json_encode(['success' => false, 'message' => 'Nazwa użytkownika jest już zajęta. Wybierz inną.']);
    $stmt_check->close();
    exit();
}

$stmt_check->close();

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql_insert = "INSERT INTO users (login, password_hash) VALUES (?, ?)";
$stmt_insert = $conn->prepare($sql_insert);
$stmt_insert->bind_param("ss", $login, $hashedPassword);

if ($stmt_insert->execute()) {
    echo json_encode(['success' => true, 'message' => 'Rejestracja zakończona sukcesem!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Wystąpił błąd rejestracji: ' . $stmt_insert->error]);
}

$stmt_insert->close();
$conn->close();
?>
